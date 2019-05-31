const fs = require('fs');
const path = require('path');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
const search = require('../controllers/search');

const adapter = new FileSync(path.join(__dirname, '..', 'data', 'db.json'));
const db = lowdb(adapter);

db.defaults({
    users: [],
    subscriptions: [],
    comments: []
}).write();

module.exports.save = function (data) {
    data.isAdmin = false;
    let userId = shortid.generate();
    let user = db.get('users').push({
        id: userId,
        name: data.userName,
        password: data.password,
        email: data.email,
        isAdmin: data.isAdmin
    }).find({
        id: userId
    }).write();

    return user;
}

module.exports.update = (data) => {
    let user = db.get('users').find({id: data.userId}).assign({
        name: data.userName,
        password: require('./crypto').sha1(data.password),
        email: data.email,
        isAdmin: data.isAdmin
    }).find({
        id: data.userId
    }).write();

    return user;
}

module.exports.login = function(data) {    
    let user = db.get('users').find({
        name: data.userName,
        password: data.password
    }).value();

    if(typeof user == 'undefined'){
        return false;
    }

    return user;;
}

module.exports.comment = (data) => {
    let id = shortid.generate();
    let comment = db.get('comments').push({
        id: id,
        date: new Date().toDateString(),
        content: data.content,
        user: data.uid,
        objectId: data.oid
    }).find({id: id}).write();
    
    return comment;
}

module.exports.readComments = (data) => {

    let comments = db.get('comments').filter({
        objectId: data.oid
    }).value();

    for(comment of comments){
        if(typeof comment != 'undefined' ){
            if(typeof db.get('users').find({id: comment.user}).value() != 'undefined'){
                comment.userName = db.get('users').find({id: comment.user}).value().name;
            }else{
                comment.userName = "Anonymous";
                comment.user = 0;
            }
        };
    }
    
    return comments;
}

module.exports.getCurrentUser = function(data) {
    let user = db.get('users').find({ id: data }).value();
    if(typeof user == 'undefined') return {name: undefined}; else return user;
}

module.exports.checkSub = (data) => {
    let sub = db.get('subscriptions').find({userId: data.userId, objectId: data.objectId}).value();

    if(typeof sub != 'undefined'){
        return true;
    }else{
        return false;
    }
}

module.exports.getObjects = function(data){
    let subs = db.get('subscriptions').filter({userId: data.userId}).value();
    let objects = [];
    for (let sub of subs) {
        objects.push(search(sub.objectId, data.objects, {
            byId: true
        })[0]);
    }

    return objects;
}

module.exports.subscribe = function (data) {
    if(data.sub == 'subscribe'){
        db.get('subscriptions').push({userId: data.userId, objectId: data.objectId}).write();
    }else if(data.sub == 'unsubscribe'){
        db.get('subscriptions').remove({userId: data.userId, objectId: data.objectId}).write();
    }
}
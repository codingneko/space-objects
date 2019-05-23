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
    subscriptions: []
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
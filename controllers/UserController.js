const fs = require('fs');
const path = require('path');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

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
    if(typeof data != 'null'){
        return db.get('users').find({ id: data }).value();
    }else{
        return {
            name: undefined 
        }
    }
}
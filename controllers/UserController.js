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
    userId = shortid.generate();
    
    db.get('users').push({
        id: userId,
        name: data.userName,
        password: data.password,
        email: data.email,
        isAdmin: data.isAdmin
    }).write().id;

    return userId;
}

module.exports.login = function(data) {

}

module.exports.get = function(data) {

}
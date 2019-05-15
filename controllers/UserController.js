const fs = require('fs');
const path = require('path');
module.exports.save = function (data) {
    let users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json')));
    data.isAdmin = false;
    users.push(data);

    fs.writeFile(path.join(__dirname, '..', 'data', 'users.json'), JSON.stringify(users), (err) => {
        if(err) {
            return console.log(err);
        }
    
        console.log("User registered!");
    });
}
const fs = require('fs');
const path = require('path');
const TLE = require('tle');

var data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'data.json')));

var objectArray = [];

for (var object of data) {
    let tle = object.OBJECT_NAME + '\n' +
        object.TLE_LINE1 + '\n' +
        object.TLE_LINE2;
    var type = object.OBJECT_TYPE;
    object = TLE.parse(tle);
    object.type = type;
    object.tle = tle;
    let craftedDate = object.id.slice(0,2);
    craftedDate = craftedDate > 57 ? '19' + craftedDate: '20' + craftedDate;
    object.launchDate = craftedDate;
    object.intldes = object.launchDate + '-' + object.id.slice(2, object.id.length);
    objectArray.push(object);
}

module.exports = objectArray;
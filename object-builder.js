const fs = require('fs');
const path = require('path');
const TLE = require('tle');

var data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'data.json')));

var objectArray = [];

for (var object of data) {
    let tle = object.OBJECT_NAME + '\n' +
        object.TLE_LINE1 + '\n' +
        object.TLE_LINE2;
    var type = object.OBJECT_TYPE;
    object = TLE.parse(tle);
    object.type = type;
    object.tle = tle;
    objectArray.push(object);
}

module.exports = objectArray;
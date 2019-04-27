module.exports = function (obj){
    for (const object of obj) {
        object.satnum = object.TLE_LINE1.slice(2, 6);
        object.classification = object.TLE_LINE1.slice(7, 7);
        object.launchYear = object.TLE_LINE1.slice(9, 10);
        object.launchNumberOfYear = object.TLE_LINE1.slice(11, 13);
        object.pieceOfLaunch = object.TLE_LINE1.slice(14,16);
        object.epochYear = object.TLE_LINE1.slice(18, 19);
        object.epochDay = object.TLE_LINE1.slice(20, 31);
        object.FTD = object.TLE_LINE1.slice(33, 42);
        object.STD = object.TLE_LINE1.slice(44, 51);
        object.bStarDrag = object.TLE_LINE1.slice(53, 60);
        object.inclination = object.TLE_LINE2.slice(8, 15);
        object.ascendingNode = object.TLE_LINE2.slice(17, 24);
        object.eccentricity = object.TLE_LINE2.slice(26, 32);
        object.perigee = object.TLE_LINE2.slice(34, 41);
        object.anomaly = object.TLE_LINE2.slice(43, 50);
        object.motion = object.TLE_LINE2.slice(52, 62);
        object.revAtEpoch = object.TLE_LINE2.slice(53, 67);
    }

    return obj;
};
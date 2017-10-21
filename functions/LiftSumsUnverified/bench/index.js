"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.listener = exports.liftSumsUnverifiedBench = functions.https
    .onRequest((req, res) => {
    const sexGroups = ['male', 'female'];
    const ageGroups = ['ageGroup1', 'ageGroup2', 'ageGroup3',
        'ageGroup4', 'ageGroup5', 'ageGroup6', 'ageGroup7', 'ageGroup8'];
    const weightGroups = ['weightGroup1', 'weightGroup2', 'weightGroup3',
        'weightGroup4', 'weightGroup5', 'weightGroup6', 'weightGroup7', 'weightGroup8'];
    for (let i = 0; i < sexGroups.length; i++) {
        for (let j = 0; j < ageGroups.length; j++) {
            for (let k = 0; k < weightGroups.length; k++) {
                let sum = 0;
                let mean = 0;
                let numObjects = 0;
                const lifts = [];
                admin.database().ref()
                    .child('liftsUnverifiedUsers')
                    .child('bench')
                    .child(sexGroups[i])
                    .child(ageGroups[j])
                    .child(weightGroups[k])
                    .orderByKey()
                    .once('value')
                    .then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        // childData will be the actual contents of the child
                        const childData = childSnapshot.val().amount;
                        sum += childData;
                        numObjects++;
                        lifts.push(childSnapshot.val().amount);
                    });
                })
                    .then(function () {
                    mean = sum / numObjects;
                })
                    .then(function () {
                    let total = 0;
                    let difference = 0;
                    for (let Z = 0; Z < lifts.length; ++Z) {
                        difference = (lifts[Z] - mean);
                        total += (difference * difference);
                    }
                    const standardDeviation = Math.sqrt((total / numObjects));
                    admin.database().ref('liftSumsUnverified')
                        .child('bench')
                        .child(sexGroups[i])
                        .child(ageGroups[j])
                        .child(weightGroups[k])
                        .update({
                        iterations: numObjects,
                        mean: mean,
                        sd: standardDeviation,
                        totalWeight: sum
                    });
                })
                    .then(function () {
                    // NOW create load a new array with data to fill the chart with
                    // NOTE: this can be done more efficiently in a previous loop
                    // but this is done for readability.
                    const liftColumns = new Array(37).fill(0);
                    for (let index = 0; index < lifts.length; ++index) {
                        if (lifts[index] > 0 && lifts[index] < 51) {
                            liftColumns[0]++;
                        }
                        else if (lifts[index] > 50 && lifts[index] < 61) {
                            liftColumns[1]++;
                        }
                        else if (lifts[index] > 60 && lifts[index] < 71) {
                            liftColumns[2]++;
                        }
                        else if (lifts[index] > 70 && lifts[index] < 81) {
                            liftColumns[3]++;
                        }
                        else if (lifts[index] > 80 && lifts[index] < 91) {
                            liftColumns[4]++;
                        }
                        else if (lifts[index] > 90 && lifts[index] < 101) {
                            liftColumns[5]++;
                        }
                        else if (lifts[index] > 100 && lifts[index] < 111) {
                            liftColumns[6]++;
                        }
                        else if (lifts[index] > 110 && lifts[index] < 121) {
                            liftColumns[7]++;
                        }
                        else if (lifts[index] > 120 && lifts[index] < 131) {
                            liftColumns[8]++;
                        }
                        else if (lifts[index] > 130 && lifts[index] < 141) {
                            liftColumns[9]++;
                        }
                        else if (lifts[index] > 140 && lifts[index] < 151) {
                            liftColumns[10]++;
                        }
                        else if (lifts[index] > 150 && lifts[index] < 161) {
                            liftColumns[11]++;
                        }
                        else if (lifts[index] > 160 && lifts[index] < 171) {
                            liftColumns[12]++;
                        }
                        else if (lifts[index] > 170 && lifts[index] < 181) {
                            liftColumns[13]++;
                        }
                        else if (lifts[index] > 180 && lifts[index] < 191) {
                            liftColumns[14]++;
                        }
                        else if (lifts[index] > 190 && lifts[index] < 201) {
                            liftColumns[15]++;
                        }
                        else if (lifts[index] > 200 && lifts[index] < 211) {
                            liftColumns[16]++;
                        }
                        else if (lifts[index] > 210 && lifts[index] < 221) {
                            liftColumns[17]++;
                        }
                        else if (lifts[index] > 220 && lifts[index] < 231) {
                            liftColumns[18]++;
                        }
                        else if (lifts[index] > 230 && lifts[index] < 241) {
                            liftColumns[19]++;
                        }
                        else if (lifts[index] > 240 && lifts[index] < 251) {
                            liftColumns[20]++;
                        }
                        else if (lifts[index] > 250 && lifts[index] < 261) {
                            liftColumns[21]++;
                        }
                        else if (lifts[index] > 260 && lifts[index] < 271) {
                            liftColumns[22]++;
                        }
                        else if (lifts[index] > 270 && lifts[index] < 281) {
                            liftColumns[23]++;
                        }
                        else if (lifts[index] > 280 && lifts[index] < 291) {
                            liftColumns[24]++;
                        }
                        else if (lifts[index] > 290 && lifts[index] < 301) {
                            liftColumns[25]++;
                        }
                        else if (lifts[index] > 300 && lifts[index] < 311) {
                            liftColumns[26]++;
                        }
                        else if (lifts[index] > 310 && lifts[index] < 321) {
                            liftColumns[27]++;
                        }
                        else if (lifts[index] > 320 && lifts[index] < 331) {
                            liftColumns[28]++;
                        }
                        else if (lifts[index] > 330 && lifts[index] < 341) {
                            liftColumns[29]++;
                        }
                        else if (lifts[index] > 340 && lifts[index] < 351) {
                            liftColumns[30]++;
                        }
                        else if (lifts[index] > 350 && lifts[index] < 361) {
                            liftColumns[31]++;
                        }
                        else if (lifts[index] > 360 && lifts[index] < 371) {
                            liftColumns[32]++;
                        }
                        else if (lifts[index] > 370 && lifts[index] < 381) {
                            liftColumns[33]++;
                        }
                        else if (lifts[index] > 380 && lifts[index] < 391) {
                            liftColumns[34]++;
                        }
                        else if (lifts[index] > 390 && lifts[index] < 401) {
                            liftColumns[35]++;
                        }
                        else {
                            liftColumns[36]++;
                        }
                    }
                    admin.database().ref('liftSumsUnverified')
                        .child('bench')
                        .child(sexGroups[i])
                        .child(ageGroups[j])
                        .child(weightGroups[k])
                        .child('chartData')
                        .set({
                        5: liftColumns[0],
                        6: liftColumns[1],
                        7: liftColumns[2],
                        8: liftColumns[3],
                        9: liftColumns[4],
                        10: liftColumns[5],
                        11: liftColumns[6],
                        12: liftColumns[7],
                        13: liftColumns[8],
                        14: liftColumns[9],
                        15: liftColumns[10],
                        16: liftColumns[11],
                        17: liftColumns[12],
                        18: liftColumns[13],
                        19: liftColumns[14],
                        20: liftColumns[15],
                        21: liftColumns[16],
                        22: liftColumns[17],
                        23: liftColumns[18],
                        24: liftColumns[19],
                        25: liftColumns[20],
                        26: liftColumns[21],
                        27: liftColumns[22],
                        28: liftColumns[23],
                        29: liftColumns[24],
                        30: liftColumns[25],
                        31: liftColumns[26],
                        32: liftColumns[27],
                        33: liftColumns[28],
                        34: liftColumns[29],
                        35: liftColumns[30],
                        36: liftColumns[31],
                        37: liftColumns[32],
                        38: liftColumns[33],
                        39: liftColumns[34],
                        40: liftColumns[35],
                        41: liftColumns[36]
                    });
                });
            }
        }
    }
    res.send('DONE');
});

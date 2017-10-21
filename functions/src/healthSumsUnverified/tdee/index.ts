import * as functions   from 'firebase-functions'
import * as admin       from 'firebase-admin'


export const listener = exports.healthSumsUnverifiedTDEE = functions.https
    .onRequest((req, res) => {
        const sexGroups = ['male', 'female'];

        const ageGroups = ['ageGroup1', 'ageGroup2', 'ageGroup3',
            'ageGroup4', 'ageGroup5', 'ageGroup6', 'ageGroup7', 'ageGroup8'];

        const heightGroups = ['heightGroup1', 'heightGroup2', 'heightGroup3',
            'heightGroup4', 'heightGroup5', 'heightGroup6', 'heightGroup7',
            'heightGroup8', 'heightGroup9', 'heightGroup10'];

        for ( let i = 0; i < sexGroups.length; i++) {
            for (let j = 0; j < ageGroups.length; j++) {
                for (let k = 0; k < heightGroups.length; k++) {
                    let sum = 0;
                    let mean = 0;
                    let numObjects = 0;
                    const lifts: any = [];

                    admin.database().ref()
                        .child('healthUnverifiedUsers')
                        .child('tdee')
                        .child(sexGroups[i])
                        .child(ageGroups[j])
                        .child(heightGroups[k])
                        .orderByKey()
                        .once('value')
                        .then(function (snapshot) {
                            snapshot.forEach(function (childSnapshot: any) {
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

                            admin.database().ref('healthSumsUnverifiedUsers')
                                .child('tdee')
                                .child(sexGroups[i])
                                .child(ageGroups[j])
                                .child(heightGroups[k])
                                .update({
                                    iterations: numObjects,
                                    mean: mean,
                                    sd: standardDeviation,
                                    totalWeight: sum
                                });
                        })
                        .then( function () {
                            // NOW create load a new array with data to fill the chart with
                            // NOTE: this can be done more efficiently in a previous loop
                            // but this is done for readability.
                            const liftColumns = new Array(24).fill(0);

                            for (let index = 0; index < lifts.length; ++index) {

                                if (lifts[index] > 0 && lifts[index] < 1100) {
                                    liftColumns[0]++;
                                } else if (lifts[index] >= 1100 && lifts[index] < 1200) {
                                    liftColumns[1]++;
                                } else if (lifts[index] >= 1200 && lifts[index] < 1300) {
                                    liftColumns[2]++;
                                } else if (lifts[index] >= 1300 && lifts[index] < 1400) {
                                    liftColumns[3]++;
                                } else if (lifts[index] >= 1400 && lifts[index] < 1500) {
                                    liftColumns[4]++;
                                } else if (lifts[index] >= 1500 && lifts[index] < 1600) {
                                    liftColumns[5]++;
                                } else if (lifts[index] >= 1600 && lifts[index] < 1700) {
                                    liftColumns[6]++;
                                } else if (lifts[index] >= 1700 && lifts[index] < 1800) {
                                    liftColumns[7]++;
                                } else if (lifts[index] >= 1800 && lifts[index] < 1900) {
                                    liftColumns[8]++;
                                } else if (lifts[index] >= 1900 && lifts[index] < 2000) {
                                    liftColumns[9]++;
                                } else if (lifts[index] >= 2000 && lifts[index] < 2100) {
                                    liftColumns[10]++;
                                } else if (lifts[index] >= 2100 && lifts[index] < 2200) {
                                    liftColumns[11]++;
                                } else if (lifts[index] >= 2200 && lifts[index] < 2300) {
                                    liftColumns[12]++;
                                } else if (lifts[index] >= 2300 && lifts[index] < 2400) {
                                    liftColumns[13]++;
                                } else if (lifts[index] >= 2400 && lifts[index] < 2500) {
                                    liftColumns[14]++;
                                } else if (lifts[index] >= 2500 && lifts[index] < 2600) {
                                    liftColumns[15]++;
                                } else if (lifts[index] >= 2600 && lifts[index] < 2700) {
                                    liftColumns[16]++;
                                } else if (lifts[index] >= 2700 && lifts[index] < 2800) {
                                    liftColumns[17]++;
                                } else if (lifts[index] >= 2800 && lifts[index] < 2900) {
                                    liftColumns[18]++;
                                } else if (lifts[index] >= 2900 && lifts[index] < 3000) {
                                    liftColumns[19]++;
                                } else if (lifts[index] >= 3000 && lifts[index] < 3100) {
                                    liftColumns[20]++;
                                } else if (lifts[index] >= 3100 && lifts[index] < 3200) {
                                    liftColumns[21]++;
                                } else if (lifts[index] >= 3200 && lifts[index] < 3300) {
                                    liftColumns[22]++;
                                }  else {
                                    liftColumns[23]++;
                                }
                            }

                            admin.database().ref('healthSumsUnverifiedUsers')
                                .child('tdee')
                                .child(sexGroups[i])
                                .child(ageGroups[j])
                                .child(heightGroups[k])
                                .child('chartData')
                                .set({
                                    0: liftColumns[0],
                                    11: liftColumns[1],
                                    12: liftColumns[2],
                                    13: liftColumns[3],
                                    14: liftColumns[4],
                                    15: liftColumns[5],
                                    16: liftColumns[6],
                                    17: liftColumns[7],
                                    18: liftColumns[8],
                                    19: liftColumns[9],
                                    20: liftColumns[10],
                                    21: liftColumns[11],
                                    22: liftColumns[12],
                                    23: liftColumns[13],
                                    24: liftColumns[14],
                                    25: liftColumns[15],
                                    26: liftColumns[16],
                                    27: liftColumns[17],
                                    28: liftColumns[18],
                                    29: liftColumns[19],
                                    30: liftColumns[20],
                                    31: liftColumns[21],
                                    32: liftColumns[22],
                                    33: liftColumns[23]
                                });
                        });
                }
            }
        }
        res.send('DONE');
    });

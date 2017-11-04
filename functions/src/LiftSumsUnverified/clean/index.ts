import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'


export const listener = exports.liftSumsUnverifiedClean = functions.https
    .onRequest((req, res) => {
        const sexGroups = ['male', 'female'];

        const ageGroups = ['ageGroup1', 'ageGroup2', 'ageGroup3',
            'ageGroup4', 'ageGroup5', 'ageGroup6', 'ageGroup7', 'ageGroup8'];

        const weightGroups = ['weightGroup1', 'weightGroup2', 'weightGroup3',
            'weightGroup4', 'weightGroup5', 'weightGroup6', 'weightGroup7', 'weightGroup8'];

// NOTE: These functions / listeners are time and are not to scale.
// I decided to leave it as is due to readability and from having over 2 dozen files, one for each function
// When the time comes I would break down the for loop to a more scalable solution as a create additional files

        for ( let i = 0; i < sexGroups.length; i++) {
            for (let j = 0; j < ageGroups.length; j++) {
                for (let k = 0; k < weightGroups.length; k++) {
                    let sum = 0;
                    let mean = 0;
                    let numObjects = 0;
                    let largest = 0;
                    const lifts: any = [];

                    admin.database().ref()
                        .child('liftsUnverifiedUsers')
                        .child('clean')
                        .child(sexGroups[i])
                        .child(ageGroups[j])
                        .child(weightGroups[k])
                        .orderByKey()
                        .once('value')
                        .then(function (snapshot) {
                            snapshot.forEach(function (childSnapshot: any) {
                                // childData will be the actual contents of the child
                                const childData = childSnapshot.val().amount;

                                if (childData > largest) {     // <!-- condition that finds the largest lift in data
                                    largest = childData;
                                }

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
                                .child('clean')
                                .child(sexGroups[i])
                                .child(ageGroups[j])
                                .child(weightGroups[k])
                                .update({
                                    iterations: numObjects,
                                    mean: mean,
                                    sd: standardDeviation,
                                    totalWeight: sum,
                                    biggestLift: largest
                                });
                        })
                        .then( function () {
                            // NOW create load a new array with data to fill the chart with
                            // NOTE: this can be done more efficiently in a previous loop
                            // but this is done for readability.
                            const liftColumns = new Array(30).fill(0);

                            for (let index = 0; index < lifts.length; ++index) {

                                if (lifts[index] > 0 && lifts[index] < 60) {
                                    liftColumns[0]++;
                                } else if (lifts[index] >= 60 && lifts[index] < 70) {
                                    liftColumns[1]++;
                                } else if (lifts[index] >= 70 && lifts[index] < 80) {
                                    liftColumns[2]++;
                                } else if (lifts[index] >= 80 && lifts[index] < 90) {
                                    liftColumns[3]++;
                                } else if (lifts[index] >= 90 && lifts[index] < 100) {
                                    liftColumns[4]++;
                                } else if (lifts[index] >= 100 && lifts[index] < 110) {
                                    liftColumns[5]++;
                                } else if (lifts[index] >= 110 && lifts[index] < 120) {
                                    liftColumns[6]++;
                                } else if (lifts[index] >= 120 && lifts[index] < 130) {
                                    liftColumns[7]++;
                                } else if (lifts[index] >= 130 && lifts[index] < 140) {
                                    liftColumns[8]++;
                                } else if (lifts[index] >= 140 && lifts[index] < 150) {
                                    liftColumns[9]++;
                                } else if (lifts[index] >= 150 && lifts[index] < 160) {
                                    liftColumns[10]++;
                                } else if (lifts[index] >= 160 && lifts[index] < 170) {
                                    liftColumns[11]++;
                                } else if (lifts[index] >= 170 && lifts[index] < 180) {
                                    liftColumns[12]++;
                                } else if (lifts[index] >= 180 && lifts[index] < 190) {
                                    liftColumns[13]++;
                                } else if (lifts[index] >= 190 && lifts[index] < 200) {
                                    liftColumns[14]++;
                                } else if (lifts[index] >= 200 && lifts[index] < 210) {
                                    liftColumns[15]++;
                                } else if (lifts[index] >= 210 && lifts[index] < 220) {
                                    liftColumns[16]++;
                                } else if (lifts[index] >= 220 && lifts[index] < 230) {
                                    liftColumns[17]++;
                                } else if (lifts[index] >= 230 && lifts[index] < 240) {
                                    liftColumns[18]++;
                                } else {
                                    liftColumns[19]++;
                                }
                            }

                            admin.database().ref('liftSumsUnverified')
                                .child('clean')
                                .child(sexGroups[i])
                                .child(ageGroups[j])
                                .child(weightGroups[k])
                                .child('chartData')
                                .set({
                                    0: liftColumns[0],
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
                                });
                        });
                }
            }
        }
        res.send('DONE');
    });

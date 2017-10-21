import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'


export const listener = exports.healthSumsUnverifiedBMR = functions.https
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
                        .child('bmr')
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
                                .child('bmr')
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
                            const liftColumns = new Array(14).fill(0);

                            for (let index = 0; index < lifts.length; ++index) {

                                if (lifts[index] > 0 && lifts[index] < 1000) {
                                    liftColumns[0]++;
                                } else if (lifts[index] >= 1000 && lifts[index] < 1100) {
                                    liftColumns[1]++;
                                } else if (lifts[index] >= 1100 && lifts[index] < 1200) {
                                    liftColumns[2]++;
                                } else if (lifts[index] >= 1200 && lifts[index] < 1300) {
                                    liftColumns[3]++;
                                } else if (lifts[index] >= 1300 && lifts[index] < 1400) {
                                    liftColumns[4]++;
                                } else if (lifts[index] >= 1400 && lifts[index] < 1500) {
                                    liftColumns[5]++;
                                } else if (lifts[index] >= 1500 && lifts[index] < 1600) {
                                    liftColumns[6]++;
                                } else if (lifts[index] >= 1600 && lifts[index] < 1700) {
                                    liftColumns[7]++;
                                } else if (lifts[index] >= 1700 && lifts[index] < 1800) {
                                    liftColumns[8]++;
                                } else if (lifts[index] >= 1800 && lifts[index] < 1900) {
                                    liftColumns[9]++;
                                } else if (lifts[index] >= 1900 && lifts[index] < 2000) {
                                    liftColumns[10]++;
                                } else if (lifts[index] >= 2000 && lifts[index] < 2100) {
                                    liftColumns[11]++;
                                } else if (lifts[index] >= 2100 && lifts[index] < 2200) {
                                    liftColumns[12]++;
                                } else {
                                    liftColumns[13]++;
                                }
                            }

                            admin.database().ref('healthSumsUnverifiedUsers')
                                .child('bmr')
                                .child(sexGroups[i])
                                .child(ageGroups[j])
                                .child(heightGroups[k])
                                .child('chartData')
                                .set({
                                    0: liftColumns[0],
                                    10: liftColumns[1],
                                    11: liftColumns[2],
                                    12: liftColumns[3],
                                    13: liftColumns[4],
                                    14: liftColumns[5],
                                    15: liftColumns[6],
                                    16: liftColumns[7],
                                    17: liftColumns[8],
                                    18: liftColumns[9],
                                    19: liftColumns[10],
                                    20: liftColumns[11],
                                    21: liftColumns[12],
                                    22: liftColumns[13]
                                });
                        });
                }
            }
        }
        res.send('DONE');
    });

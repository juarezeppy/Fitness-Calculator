import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'


export const listener = exports.healthSumsUnverifiedBMI = functions.https
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
                        .child('bmi')
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
                                .child('bmi')
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
                            const liftColumns = new Array(20).fill(0);

                            for (let index = 0; index < lifts.length; ++index) {

                                if (lifts[index] > 0 && lifts[index] < 12) {
                                    liftColumns[0]++;
                                } else if (lifts[index] >= 12 && lifts[index] < 14) {
                                    liftColumns[1]++;
                                } else if (lifts[index] >= 14 && lifts[index] < 16) {
                                    liftColumns[2]++;
                                } else if (lifts[index] >= 16 && lifts[index] < 18) {
                                    liftColumns[3]++;
                                } else if (lifts[index] >= 18 && lifts[index] < 20) {
                                    liftColumns[4]++;
                                } else if (lifts[index] >= 20 && lifts[index] < 22) {
                                    liftColumns[5]++;
                                } else if (lifts[index] >= 22 && lifts[index] < 24) {
                                    liftColumns[6]++;
                                } else if (lifts[index] >= 24 && lifts[index] < 26) {
                                    liftColumns[7]++;
                                } else if (lifts[index] >= 26 && lifts[index] < 28) {
                                    liftColumns[8]++;
                                } else if (lifts[index] >= 28 && lifts[index] < 30) {
                                    liftColumns[9]++;
                                } else if (lifts[index] >= 30 && lifts[index] < 32) {
                                    liftColumns[10]++;
                                } else if (lifts[index] >= 32 && lifts[index] < 34) {
                                    liftColumns[11]++;
                                } else if (lifts[index] >= 34 && lifts[index] < 36) {
                                    liftColumns[12]++;
                                } else if (lifts[index] >= 36 && lifts[index] < 38) {
                                    liftColumns[13]++;
                                } else if (lifts[index] >= 38 && lifts[index] < 40) {
                                    liftColumns[14]++;
                                } else if (lifts[index] >= 40 && lifts[index] < 42) {
                                    liftColumns[15]++;
                                } else if (lifts[index] >= 42 && lifts[index] < 44) {
                                    liftColumns[16]++;
                                } else if (lifts[index] >= 44 && lifts[index] < 46) {
                                    liftColumns[17]++;
                                } else if (lifts[index] >= 46 && lifts[index] < 48) {
                                    liftColumns[18]++;
                                } else {
                                    liftColumns[19]++;
                                }
                            }

                            admin.database().ref('healthSumsUnverifiedUsers')
                                .child('bmi')
                                .child(sexGroups[i])
                                .child(ageGroups[j])
                                .child(heightGroups[k])
                                .child('chartData')
                                .set({
                                    0: liftColumns[0],
                                    12: liftColumns[1],
                                    14: liftColumns[2],
                                    16: liftColumns[3],
                                    18: liftColumns[4],
                                    20: liftColumns[5],
                                    22: liftColumns[6],
                                    24: liftColumns[7],
                                    26: liftColumns[8],
                                    28: liftColumns[9],
                                    30: liftColumns[10],
                                    32: liftColumns[11],
                                    34: liftColumns[12],
                                    36: liftColumns[13],
                                    38: liftColumns[14],
                                    40: liftColumns[15],
                                    42: liftColumns[16],
                                    44: liftColumns[17],
                                    46: liftColumns[18],
                                    48: liftColumns[19]
                                });
                        });
                }
            }
        }
        res.send('DONE');
    });

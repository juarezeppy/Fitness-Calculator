"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.listener = exports.liftSum = functions.https
    .onRequest((req, res) => {
    let sum = 0;
    let mean = 0;
    let numObjects = 0;
    const lifts = [];
    admin.database().ref('liftsVerifiedUsers')
        .child('benchpress')
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
        let standardDeviation = 0;
        let difference = 0;
        for (let i = 0; i < lifts.length; ++i) {
            difference = (lifts[i] - mean);
            total += (difference * difference);
        }
        standardDeviation = Math.sqrt((total / numObjects));
        admin.database().ref('liftSumVerifiedUsers')
            .child('bench')
            .update({
            totalWeight: sum,
            mean: mean,
            iterations: numObjects,
            sd: standardDeviation
        });
        res.send('DONE');
    });
});

(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
const HelloWorld = __webpack_require__(3);
const LiftSums = __webpack_require__(4);
const LiftSumsUnverifiedBench = __webpack_require__(5);
const LiftSumsUnverifiedSquat = __webpack_require__(6);
const LiftSumsUnverifiedFrontSquat = __webpack_require__(7);
const LiftSumsUnverifiedDeadlift = __webpack_require__(8);
const LiftSumsUnverifiedClean = __webpack_require__(9);
const LiftSumsUnverifiedPowerClean = __webpack_require__(10);
const HealthSumsUnverifiedBMI = __webpack_require__(11);
const HealthSumsUnverifiedBMR = __webpack_require__(12);
const HealthSumsUnverifiedTDEE = __webpack_require__(13);
admin.initializeApp(functions.config().firebase);
exports.helloWorld = HelloWorld.listener;
exports.liftSums = LiftSums.listener;
exports.liftSumsUnverifiedBench = LiftSumsUnverifiedBench.listener;
exports.liftSumsUnverifiedSquat = LiftSumsUnverifiedSquat.listener;
exports.liftSumsUnverifiedFrontSquat = LiftSumsUnverifiedFrontSquat.listener;
exports.liftSumsUnverifiedDeadlift = LiftSumsUnverifiedDeadlift.listener;
exports.liftSumsUnverifiedClean = LiftSumsUnverifiedClean.listener;
exports.liftSumsUnverifiedPowerClean = LiftSumsUnverifiedPowerClean.listener;
exports.healthSumsUnverifiedBMI = HealthSumsUnverifiedBMI.listener;
exports.healthSumsUnverifiedBMR = HealthSumsUnverifiedBMR.listener;
exports.healthSumsUnverifiedTDEE = HealthSumsUnverifiedTDEE.listener;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// src/add-message/index.ts
const functions = __webpack_require__(0);
exports.listener = exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
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
                let largest = 0;
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
                        if (childData > largest) {
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
                        .child('bench')
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
                    .then(function () {
                    // NOW create load a new array with data to fill the chart with
                    // NOTE: this can be done more efficiently in a previous loop
                    // but this is done for readability.
                    const liftColumns = new Array(30).fill(0);
                    for (let index = 0; index < lifts.length; ++index) {
                        if (lifts[index] > 0 && lifts[index] < 60) {
                            liftColumns[0]++;
                        }
                        else if (lifts[index] >= 60 && lifts[index] < 70) {
                            liftColumns[1]++;
                        }
                        else if (lifts[index] >= 70 && lifts[index] < 80) {
                            liftColumns[2]++;
                        }
                        else if (lifts[index] >= 80 && lifts[index] < 90) {
                            liftColumns[3]++;
                        }
                        else if (lifts[index] >= 90 && lifts[index] < 100) {
                            liftColumns[4]++;
                        }
                        else if (lifts[index] >= 100 && lifts[index] < 110) {
                            liftColumns[5]++;
                        }
                        else if (lifts[index] >= 110 && lifts[index] < 120) {
                            liftColumns[6]++;
                        }
                        else if (lifts[index] >= 120 && lifts[index] < 130) {
                            liftColumns[7]++;
                        }
                        else if (lifts[index] >= 130 && lifts[index] < 140) {
                            liftColumns[8]++;
                        }
                        else if (lifts[index] >= 140 && lifts[index] < 150) {
                            liftColumns[9]++;
                        }
                        else if (lifts[index] >= 150 && lifts[index] < 160) {
                            liftColumns[10]++;
                        }
                        else if (lifts[index] >= 160 && lifts[index] < 170) {
                            liftColumns[11]++;
                        }
                        else if (lifts[index] >= 170 && lifts[index] < 180) {
                            liftColumns[12]++;
                        }
                        else if (lifts[index] >= 180 && lifts[index] < 190) {
                            liftColumns[13]++;
                        }
                        else if (lifts[index] >= 190 && lifts[index] < 200) {
                            liftColumns[14]++;
                        }
                        else if (lifts[index] >= 200 && lifts[index] < 210) {
                            liftColumns[15]++;
                        }
                        else if (lifts[index] >= 210 && lifts[index] < 220) {
                            liftColumns[16]++;
                        }
                        else if (lifts[index] >= 220 && lifts[index] < 230) {
                            liftColumns[17]++;
                        }
                        else if (lifts[index] >= 230 && lifts[index] < 240) {
                            liftColumns[18]++;
                        }
                        else if (lifts[index] >= 240 && lifts[index] < 250) {
                            liftColumns[19]++;
                        }
                        else if (lifts[index] >= 250 && lifts[index] < 260) {
                            liftColumns[20]++;
                        }
                        else if (lifts[index] >= 260 && lifts[index] < 270) {
                            liftColumns[21]++;
                        }
                        else if (lifts[index] >= 270 && lifts[index] < 280) {
                            liftColumns[22]++;
                        }
                        else if (lifts[index] >= 280 && lifts[index] < 290) {
                            liftColumns[23]++;
                        }
                        else if (lifts[index] >= 290 && lifts[index] < 300) {
                            liftColumns[24]++;
                        }
                        else if (lifts[index] >= 300 && lifts[index] < 310) {
                            liftColumns[25]++;
                        }
                        else if (lifts[index] >= 310 && lifts[index] < 320) {
                            liftColumns[26]++;
                        }
                        else if (lifts[index] >= 320 && lifts[index] < 330) {
                            liftColumns[27]++;
                        }
                        else if (lifts[index] >= 330 && lifts[index] < 340) {
                            liftColumns[28]++;
                        }
                        else {
                            liftColumns[29]++;
                        }
                    }
                    admin.database().ref('liftSumsUnverified')
                        .child('bench')
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
                        25: liftColumns[20],
                        26: liftColumns[21],
                        27: liftColumns[22],
                        28: liftColumns[23],
                        29: liftColumns[24],
                        30: liftColumns[25],
                        31: liftColumns[26],
                        32: liftColumns[27],
                        33: liftColumns[28],
                        34: liftColumns[29]
                    });
                });
            }
        }
    }
    res.send('DONE');
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
exports.listener = exports.liftSumsUnverifiedSquat = functions.https
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
                let largest = 0;
                const lifts = [];
                admin.database().ref()
                    .child('liftsUnverifiedUsers')
                    .child('squat')
                    .child(sexGroups[i])
                    .child(ageGroups[j])
                    .child(weightGroups[k])
                    .orderByKey()
                    .once('value')
                    .then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        // childData will be the actual contents of the child
                        const childData = childSnapshot.val().amount;
                        if (childData > largest) {
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
                        .child('squat')
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
                    .then(function () {
                    // NOW create load a new array with data to fill the chart with
                    // NOTE: this can be done more efficiently in a previous loop
                    // but this is done for readability.
                    const liftColumns = new Array(30).fill(0);
                    for (let index = 0; index < lifts.length; ++index) {
                        if (lifts[index] > 0 && lifts[index] < 60) {
                            liftColumns[0]++;
                        }
                        else if (lifts[index] >= 60 && lifts[index] < 70) {
                            liftColumns[1]++;
                        }
                        else if (lifts[index] >= 70 && lifts[index] < 80) {
                            liftColumns[2]++;
                        }
                        else if (lifts[index] >= 80 && lifts[index] < 90) {
                            liftColumns[3]++;
                        }
                        else if (lifts[index] >= 90 && lifts[index] < 100) {
                            liftColumns[4]++;
                        }
                        else if (lifts[index] >= 100 && lifts[index] < 110) {
                            liftColumns[5]++;
                        }
                        else if (lifts[index] >= 110 && lifts[index] < 120) {
                            liftColumns[6]++;
                        }
                        else if (lifts[index] >= 120 && lifts[index] < 130) {
                            liftColumns[7]++;
                        }
                        else if (lifts[index] >= 130 && lifts[index] < 140) {
                            liftColumns[8]++;
                        }
                        else if (lifts[index] >= 140 && lifts[index] < 150) {
                            liftColumns[9]++;
                        }
                        else if (lifts[index] >= 150 && lifts[index] < 160) {
                            liftColumns[10]++;
                        }
                        else if (lifts[index] >= 160 && lifts[index] < 170) {
                            liftColumns[11]++;
                        }
                        else if (lifts[index] >= 170 && lifts[index] < 180) {
                            liftColumns[12]++;
                        }
                        else if (lifts[index] >= 180 && lifts[index] < 190) {
                            liftColumns[13]++;
                        }
                        else if (lifts[index] >= 190 && lifts[index] < 200) {
                            liftColumns[14]++;
                        }
                        else if (lifts[index] >= 200 && lifts[index] < 210) {
                            liftColumns[15]++;
                        }
                        else if (lifts[index] >= 210 && lifts[index] < 220) {
                            liftColumns[16]++;
                        }
                        else if (lifts[index] >= 220 && lifts[index] < 230) {
                            liftColumns[17]++;
                        }
                        else if (lifts[index] >= 230 && lifts[index] < 240) {
                            liftColumns[18]++;
                        }
                        else if (lifts[index] >= 240 && lifts[index] < 250) {
                            liftColumns[19]++;
                        }
                        else if (lifts[index] >= 250 && lifts[index] < 260) {
                            liftColumns[20]++;
                        }
                        else if (lifts[index] >= 260 && lifts[index] < 270) {
                            liftColumns[21]++;
                        }
                        else if (lifts[index] >= 270 && lifts[index] < 280) {
                            liftColumns[22]++;
                        }
                        else if (lifts[index] >= 280 && lifts[index] < 290) {
                            liftColumns[23]++;
                        }
                        else if (lifts[index] >= 290 && lifts[index] < 300) {
                            liftColumns[24]++;
                        }
                        else if (lifts[index] >= 300 && lifts[index] < 310) {
                            liftColumns[25]++;
                        }
                        else if (lifts[index] >= 310 && lifts[index] < 320) {
                            liftColumns[26]++;
                        }
                        else if (lifts[index] >= 320 && lifts[index] < 330) {
                            liftColumns[27]++;
                        }
                        else if (lifts[index] >= 330 && lifts[index] < 340) {
                            liftColumns[28]++;
                        }
                        else {
                            liftColumns[29]++;
                        }
                    }
                    admin.database().ref('liftSumsUnverified')
                        .child('squat')
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
                        25: liftColumns[20],
                        26: liftColumns[21],
                        27: liftColumns[22],
                        28: liftColumns[23],
                        29: liftColumns[24],
                        30: liftColumns[25],
                        31: liftColumns[26],
                        32: liftColumns[27],
                        33: liftColumns[28],
                        34: liftColumns[29]
                    });
                });
            }
        }
    }
    res.send('DONE');
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
exports.listener = exports.liftSumsUnverifiedSquat = functions.https
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
                let largest = 0;
                const lifts = [];
                admin.database().ref()
                    .child('liftsUnverifiedUsers')
                    .child('frontSquat')
                    .child(sexGroups[i])
                    .child(ageGroups[j])
                    .child(weightGroups[k])
                    .orderByKey()
                    .once('value')
                    .then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        // childData will be the actual contents of the child
                        const childData = childSnapshot.val().amount;
                        if (childData > largest) {
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
                        .child('frontSquat')
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
                    .then(function () {
                    // NOW create load a new array with data to fill the chart with
                    // NOTE: this can be done more efficiently in a previous loop
                    // but this is done for readability.
                    const liftColumns = new Array(30).fill(0);
                    for (let index = 0; index < lifts.length; ++index) {
                        if (lifts[index] > 0 && lifts[index] < 60) {
                            liftColumns[0]++;
                        }
                        else if (lifts[index] >= 60 && lifts[index] < 70) {
                            liftColumns[1]++;
                        }
                        else if (lifts[index] >= 70 && lifts[index] < 80) {
                            liftColumns[2]++;
                        }
                        else if (lifts[index] >= 80 && lifts[index] < 90) {
                            liftColumns[3]++;
                        }
                        else if (lifts[index] >= 90 && lifts[index] < 100) {
                            liftColumns[4]++;
                        }
                        else if (lifts[index] >= 100 && lifts[index] < 110) {
                            liftColumns[5]++;
                        }
                        else if (lifts[index] >= 110 && lifts[index] < 120) {
                            liftColumns[6]++;
                        }
                        else if (lifts[index] >= 120 && lifts[index] < 130) {
                            liftColumns[7]++;
                        }
                        else if (lifts[index] >= 130 && lifts[index] < 140) {
                            liftColumns[8]++;
                        }
                        else if (lifts[index] >= 140 && lifts[index] < 150) {
                            liftColumns[9]++;
                        }
                        else if (lifts[index] >= 150 && lifts[index] < 160) {
                            liftColumns[10]++;
                        }
                        else if (lifts[index] >= 160 && lifts[index] < 170) {
                            liftColumns[11]++;
                        }
                        else if (lifts[index] >= 170 && lifts[index] < 180) {
                            liftColumns[12]++;
                        }
                        else if (lifts[index] >= 180 && lifts[index] < 190) {
                            liftColumns[13]++;
                        }
                        else if (lifts[index] >= 190 && lifts[index] < 200) {
                            liftColumns[14]++;
                        }
                        else if (lifts[index] >= 200 && lifts[index] < 210) {
                            liftColumns[15]++;
                        }
                        else if (lifts[index] >= 210 && lifts[index] < 220) {
                            liftColumns[16]++;
                        }
                        else if (lifts[index] >= 220 && lifts[index] < 230) {
                            liftColumns[17]++;
                        }
                        else if (lifts[index] >= 230 && lifts[index] < 240) {
                            liftColumns[18]++;
                        }
                        else if (lifts[index] >= 240 && lifts[index] < 250) {
                            liftColumns[19]++;
                        }
                        else if (lifts[index] >= 250 && lifts[index] < 260) {
                            liftColumns[20]++;
                        }
                        else if (lifts[index] >= 260 && lifts[index] < 270) {
                            liftColumns[21]++;
                        }
                        else if (lifts[index] >= 270 && lifts[index] < 280) {
                            liftColumns[22]++;
                        }
                        else if (lifts[index] >= 280 && lifts[index] < 290) {
                            liftColumns[23]++;
                        }
                        else if (lifts[index] >= 290 && lifts[index] < 300) {
                            liftColumns[24]++;
                        }
                        else if (lifts[index] >= 300 && lifts[index] < 310) {
                            liftColumns[25]++;
                        }
                        else if (lifts[index] >= 310 && lifts[index] < 320) {
                            liftColumns[26]++;
                        }
                        else if (lifts[index] >= 320 && lifts[index] < 330) {
                            liftColumns[27]++;
                        }
                        else if (lifts[index] >= 330 && lifts[index] < 340) {
                            liftColumns[28]++;
                        }
                        else {
                            liftColumns[29]++;
                        }
                    }
                    admin.database().ref('liftSumsUnverified')
                        .child('frontSquat')
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
                        25: liftColumns[20],
                        26: liftColumns[21],
                        27: liftColumns[22],
                        28: liftColumns[23],
                        29: liftColumns[24],
                        30: liftColumns[25],
                        31: liftColumns[26],
                        32: liftColumns[27],
                        33: liftColumns[28],
                        34: liftColumns[29]
                    });
                });
            }
        }
    }
    res.send('DONE');
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
exports.listener = exports.liftSumsUnverifiedDeadlift = functions.https
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
                let largest = 0;
                const lifts = [];
                admin.database().ref()
                    .child('liftsUnverifiedUsers')
                    .child('deadlift')
                    .child(sexGroups[i])
                    .child(ageGroups[j])
                    .child(weightGroups[k])
                    .orderByKey()
                    .once('value')
                    .then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        // childData will be the actual contents of the child
                        const childData = childSnapshot.val().amount;
                        if (childData > largest) {
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
                        .child('deadlift')
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
                    .then(function () {
                    // NOW create load a new array with data to fill the chart with
                    // NOTE: this can be done more efficiently in a previous loop
                    // but this is done for readability.
                    const liftColumns = new Array(30).fill(0);
                    for (let index = 0; index < lifts.length; ++index) {
                        if (lifts[index] > 0 && lifts[index] < 60) {
                            liftColumns[0]++;
                        }
                        else if (lifts[index] >= 60 && lifts[index] < 70) {
                            liftColumns[1]++;
                        }
                        else if (lifts[index] >= 70 && lifts[index] < 80) {
                            liftColumns[2]++;
                        }
                        else if (lifts[index] >= 80 && lifts[index] < 90) {
                            liftColumns[3]++;
                        }
                        else if (lifts[index] >= 90 && lifts[index] < 100) {
                            liftColumns[4]++;
                        }
                        else if (lifts[index] >= 100 && lifts[index] < 110) {
                            liftColumns[5]++;
                        }
                        else if (lifts[index] >= 110 && lifts[index] < 120) {
                            liftColumns[6]++;
                        }
                        else if (lifts[index] >= 120 && lifts[index] < 130) {
                            liftColumns[7]++;
                        }
                        else if (lifts[index] >= 130 && lifts[index] < 140) {
                            liftColumns[8]++;
                        }
                        else if (lifts[index] >= 140 && lifts[index] < 150) {
                            liftColumns[9]++;
                        }
                        else if (lifts[index] >= 150 && lifts[index] < 160) {
                            liftColumns[10]++;
                        }
                        else if (lifts[index] >= 160 && lifts[index] < 170) {
                            liftColumns[11]++;
                        }
                        else if (lifts[index] >= 170 && lifts[index] < 180) {
                            liftColumns[12]++;
                        }
                        else if (lifts[index] >= 180 && lifts[index] < 190) {
                            liftColumns[13]++;
                        }
                        else if (lifts[index] >= 190 && lifts[index] < 200) {
                            liftColumns[14]++;
                        }
                        else if (lifts[index] >= 200 && lifts[index] < 210) {
                            liftColumns[15]++;
                        }
                        else if (lifts[index] >= 210 && lifts[index] < 220) {
                            liftColumns[16]++;
                        }
                        else if (lifts[index] >= 220 && lifts[index] < 230) {
                            liftColumns[17]++;
                        }
                        else if (lifts[index] >= 230 && lifts[index] < 240) {
                            liftColumns[18]++;
                        }
                        else if (lifts[index] >= 240 && lifts[index] < 250) {
                            liftColumns[19]++;
                        }
                        else if (lifts[index] >= 250 && lifts[index] < 260) {
                            liftColumns[20]++;
                        }
                        else if (lifts[index] >= 260 && lifts[index] < 270) {
                            liftColumns[21]++;
                        }
                        else if (lifts[index] >= 270 && lifts[index] < 280) {
                            liftColumns[22]++;
                        }
                        else if (lifts[index] >= 280 && lifts[index] < 290) {
                            liftColumns[23]++;
                        }
                        else if (lifts[index] >= 290 && lifts[index] < 300) {
                            liftColumns[24]++;
                        }
                        else if (lifts[index] >= 300 && lifts[index] < 310) {
                            liftColumns[25]++;
                        }
                        else if (lifts[index] >= 310 && lifts[index] < 320) {
                            liftColumns[26]++;
                        }
                        else if (lifts[index] >= 320 && lifts[index] < 330) {
                            liftColumns[27]++;
                        }
                        else if (lifts[index] >= 330 && lifts[index] < 340) {
                            liftColumns[28]++;
                        }
                        else {
                            liftColumns[29]++;
                        }
                    }
                    admin.database().ref('liftSumsUnverified')
                        .child('deadlift')
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
                        25: liftColumns[20],
                        26: liftColumns[21],
                        27: liftColumns[22],
                        28: liftColumns[23],
                        29: liftColumns[24],
                        30: liftColumns[25],
                        31: liftColumns[26],
                        32: liftColumns[27],
                        33: liftColumns[28],
                        34: liftColumns[29]
                    });
                });
            }
        }
    }
    res.send('DONE');
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
exports.listener = exports.liftSumsUnverifiedClean = functions.https
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
                let largest = 0;
                const lifts = [];
                admin.database().ref()
                    .child('liftsUnverifiedUsers')
                    .child('clean')
                    .child(sexGroups[i])
                    .child(ageGroups[j])
                    .child(weightGroups[k])
                    .orderByKey()
                    .once('value')
                    .then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        // childData will be the actual contents of the child
                        const childData = childSnapshot.val().amount;
                        if (childData > largest) {
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
                    .then(function () {
                    // NOW create load a new array with data to fill the chart with
                    // NOTE: this can be done more efficiently in a previous loop
                    // but this is done for readability.
                    const liftColumns = new Array(30).fill(0);
                    for (let index = 0; index < lifts.length; ++index) {
                        if (lifts[index] > 0 && lifts[index] < 60) {
                            liftColumns[0]++;
                        }
                        else if (lifts[index] >= 60 && lifts[index] < 70) {
                            liftColumns[1]++;
                        }
                        else if (lifts[index] >= 70 && lifts[index] < 80) {
                            liftColumns[2]++;
                        }
                        else if (lifts[index] >= 80 && lifts[index] < 90) {
                            liftColumns[3]++;
                        }
                        else if (lifts[index] >= 90 && lifts[index] < 100) {
                            liftColumns[4]++;
                        }
                        else if (lifts[index] >= 100 && lifts[index] < 110) {
                            liftColumns[5]++;
                        }
                        else if (lifts[index] >= 110 && lifts[index] < 120) {
                            liftColumns[6]++;
                        }
                        else if (lifts[index] >= 120 && lifts[index] < 130) {
                            liftColumns[7]++;
                        }
                        else if (lifts[index] >= 130 && lifts[index] < 140) {
                            liftColumns[8]++;
                        }
                        else if (lifts[index] >= 140 && lifts[index] < 150) {
                            liftColumns[9]++;
                        }
                        else if (lifts[index] >= 150 && lifts[index] < 160) {
                            liftColumns[10]++;
                        }
                        else if (lifts[index] >= 160 && lifts[index] < 170) {
                            liftColumns[11]++;
                        }
                        else if (lifts[index] >= 170 && lifts[index] < 180) {
                            liftColumns[12]++;
                        }
                        else if (lifts[index] >= 180 && lifts[index] < 190) {
                            liftColumns[13]++;
                        }
                        else if (lifts[index] >= 190 && lifts[index] < 200) {
                            liftColumns[14]++;
                        }
                        else if (lifts[index] >= 200 && lifts[index] < 210) {
                            liftColumns[15]++;
                        }
                        else if (lifts[index] >= 210 && lifts[index] < 220) {
                            liftColumns[16]++;
                        }
                        else if (lifts[index] >= 220 && lifts[index] < 230) {
                            liftColumns[17]++;
                        }
                        else if (lifts[index] >= 230 && lifts[index] < 240) {
                            liftColumns[18]++;
                        }
                        else if (lifts[index] >= 240 && lifts[index] < 250) {
                            liftColumns[19]++;
                        }
                        else if (lifts[index] >= 250 && lifts[index] < 260) {
                            liftColumns[20]++;
                        }
                        else if (lifts[index] >= 260 && lifts[index] < 270) {
                            liftColumns[21]++;
                        }
                        else if (lifts[index] >= 270 && lifts[index] < 280) {
                            liftColumns[22]++;
                        }
                        else if (lifts[index] >= 280 && lifts[index] < 290) {
                            liftColumns[23]++;
                        }
                        else if (lifts[index] >= 290 && lifts[index] < 300) {
                            liftColumns[24]++;
                        }
                        else if (lifts[index] >= 300 && lifts[index] < 310) {
                            liftColumns[25]++;
                        }
                        else if (lifts[index] >= 310 && lifts[index] < 320) {
                            liftColumns[26]++;
                        }
                        else if (lifts[index] >= 320 && lifts[index] < 330) {
                            liftColumns[27]++;
                        }
                        else if (lifts[index] >= 330 && lifts[index] < 340) {
                            liftColumns[28]++;
                        }
                        else {
                            liftColumns[29]++;
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
                        25: liftColumns[20],
                        26: liftColumns[21],
                        27: liftColumns[22],
                        28: liftColumns[23],
                        29: liftColumns[24],
                        30: liftColumns[25],
                        31: liftColumns[26],
                        32: liftColumns[27],
                        33: liftColumns[28],
                        34: liftColumns[29]
                    });
                });
            }
        }
    }
    res.send('DONE');
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
exports.listener = exports.liftSumsUnverifiedPowerClean = functions.https
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
                let largest = 0;
                const lifts = [];
                admin.database().ref()
                    .child('liftsUnverifiedUsers')
                    .child('powerClean')
                    .child(sexGroups[i])
                    .child(ageGroups[j])
                    .child(weightGroups[k])
                    .orderByKey()
                    .once('value')
                    .then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        // childData will be the actual contents of the child
                        const childData = childSnapshot.val().amount;
                        if (childData > largest) {
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
                        .child('powerClean')
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
                    .then(function () {
                    // NOW create load a new array with data to fill the chart with
                    // NOTE: this can be done more efficiently in a previous loop
                    // but this is done for readability.
                    const liftColumns = new Array(30).fill(0);
                    for (let index = 0; index < lifts.length; ++index) {
                        if (lifts[index] > 0 && lifts[index] < 60) {
                            liftColumns[0]++;
                        }
                        else if (lifts[index] >= 60 && lifts[index] < 70) {
                            liftColumns[1]++;
                        }
                        else if (lifts[index] >= 70 && lifts[index] < 80) {
                            liftColumns[2]++;
                        }
                        else if (lifts[index] >= 80 && lifts[index] < 90) {
                            liftColumns[3]++;
                        }
                        else if (lifts[index] >= 90 && lifts[index] < 100) {
                            liftColumns[4]++;
                        }
                        else if (lifts[index] >= 100 && lifts[index] < 110) {
                            liftColumns[5]++;
                        }
                        else if (lifts[index] >= 110 && lifts[index] < 120) {
                            liftColumns[6]++;
                        }
                        else if (lifts[index] >= 120 && lifts[index] < 130) {
                            liftColumns[7]++;
                        }
                        else if (lifts[index] >= 130 && lifts[index] < 140) {
                            liftColumns[8]++;
                        }
                        else if (lifts[index] >= 140 && lifts[index] < 150) {
                            liftColumns[9]++;
                        }
                        else if (lifts[index] >= 150 && lifts[index] < 160) {
                            liftColumns[10]++;
                        }
                        else if (lifts[index] >= 160 && lifts[index] < 170) {
                            liftColumns[11]++;
                        }
                        else if (lifts[index] >= 170 && lifts[index] < 180) {
                            liftColumns[12]++;
                        }
                        else if (lifts[index] >= 180 && lifts[index] < 190) {
                            liftColumns[13]++;
                        }
                        else if (lifts[index] >= 190 && lifts[index] < 200) {
                            liftColumns[14]++;
                        }
                        else if (lifts[index] >= 200 && lifts[index] < 210) {
                            liftColumns[15]++;
                        }
                        else if (lifts[index] >= 210 && lifts[index] < 220) {
                            liftColumns[16]++;
                        }
                        else if (lifts[index] >= 220 && lifts[index] < 230) {
                            liftColumns[17]++;
                        }
                        else if (lifts[index] >= 230 && lifts[index] < 240) {
                            liftColumns[18]++;
                        }
                        else if (lifts[index] >= 240 && lifts[index] < 250) {
                            liftColumns[19]++;
                        }
                        else if (lifts[index] >= 250 && lifts[index] < 260) {
                            liftColumns[20]++;
                        }
                        else if (lifts[index] >= 260 && lifts[index] < 270) {
                            liftColumns[21]++;
                        }
                        else if (lifts[index] >= 270 && lifts[index] < 280) {
                            liftColumns[22]++;
                        }
                        else if (lifts[index] >= 280 && lifts[index] < 290) {
                            liftColumns[23]++;
                        }
                        else if (lifts[index] >= 290 && lifts[index] < 300) {
                            liftColumns[24]++;
                        }
                        else if (lifts[index] >= 300 && lifts[index] < 310) {
                            liftColumns[25]++;
                        }
                        else if (lifts[index] >= 310 && lifts[index] < 320) {
                            liftColumns[26]++;
                        }
                        else if (lifts[index] >= 320 && lifts[index] < 330) {
                            liftColumns[27]++;
                        }
                        else if (lifts[index] >= 330 && lifts[index] < 340) {
                            liftColumns[28]++;
                        }
                        else {
                            liftColumns[29]++;
                        }
                    }
                    admin.database().ref('liftSumsUnverified')
                        .child('powerClean')
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
                        25: liftColumns[20],
                        26: liftColumns[21],
                        27: liftColumns[22],
                        28: liftColumns[23],
                        29: liftColumns[24],
                        30: liftColumns[25],
                        31: liftColumns[26],
                        32: liftColumns[27],
                        33: liftColumns[28],
                        34: liftColumns[29]
                    });
                });
            }
        }
    }
    res.send('DONE');
});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
exports.listener = exports.healthSumsUnverifiedBMI = functions.https
    .onRequest((req, res) => {
    const sexGroups = ['male', 'female'];
    const ageGroups = ['ageGroup1', 'ageGroup2', 'ageGroup3',
        'ageGroup4', 'ageGroup5', 'ageGroup6', 'ageGroup7', 'ageGroup8'];
    const heightGroups = ['heightGroup1', 'heightGroup2', 'heightGroup3',
        'heightGroup4', 'heightGroup5', 'heightGroup6', 'heightGroup7',
        'heightGroup8', 'heightGroup9', 'heightGroup10'];
    for (let i = 0; i < sexGroups.length; i++) {
        for (let j = 0; j < ageGroups.length; j++) {
            for (let k = 0; k < heightGroups.length; k++) {
                let sum = 0;
                let mean = 0;
                let numObjects = 0;
                const lifts = [];
                admin.database().ref()
                    .child('healthUnverifiedUsers')
                    .child('bmi')
                    .child(sexGroups[i])
                    .child(ageGroups[j])
                    .child(heightGroups[k])
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
                    .then(function () {
                    // NOW create load a new array with data to fill the chart with
                    // NOTE: this can be done more efficiently in a previous loop
                    // but this is done for readability.
                    const liftColumns = new Array(20).fill(0);
                    for (let index = 0; index < lifts.length; ++index) {
                        if (lifts[index] > 0 && lifts[index] < 12) {
                            liftColumns[0]++;
                        }
                        else if (lifts[index] >= 12 && lifts[index] < 14) {
                            liftColumns[1]++;
                        }
                        else if (lifts[index] >= 14 && lifts[index] < 16) {
                            liftColumns[2]++;
                        }
                        else if (lifts[index] >= 16 && lifts[index] < 18) {
                            liftColumns[3]++;
                        }
                        else if (lifts[index] >= 18 && lifts[index] < 20) {
                            liftColumns[4]++;
                        }
                        else if (lifts[index] >= 20 && lifts[index] < 22) {
                            liftColumns[5]++;
                        }
                        else if (lifts[index] >= 22 && lifts[index] < 24) {
                            liftColumns[6]++;
                        }
                        else if (lifts[index] >= 24 && lifts[index] < 26) {
                            liftColumns[7]++;
                        }
                        else if (lifts[index] >= 26 && lifts[index] < 28) {
                            liftColumns[8]++;
                        }
                        else if (lifts[index] >= 28 && lifts[index] < 30) {
                            liftColumns[9]++;
                        }
                        else if (lifts[index] >= 30 && lifts[index] < 32) {
                            liftColumns[10]++;
                        }
                        else if (lifts[index] >= 32 && lifts[index] < 34) {
                            liftColumns[11]++;
                        }
                        else if (lifts[index] >= 34 && lifts[index] < 36) {
                            liftColumns[12]++;
                        }
                        else if (lifts[index] >= 36 && lifts[index] < 38) {
                            liftColumns[13]++;
                        }
                        else if (lifts[index] >= 38 && lifts[index] < 40) {
                            liftColumns[14]++;
                        }
                        else if (lifts[index] >= 40 && lifts[index] < 42) {
                            liftColumns[15]++;
                        }
                        else if (lifts[index] >= 42 && lifts[index] < 44) {
                            liftColumns[16]++;
                        }
                        else if (lifts[index] >= 44 && lifts[index] < 46) {
                            liftColumns[17]++;
                        }
                        else if (lifts[index] >= 46 && lifts[index] < 48) {
                            liftColumns[18]++;
                        }
                        else {
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


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
exports.listener = exports.healthSumsUnverifiedBMR = functions.https
    .onRequest((req, res) => {
    const sexGroups = ['male', 'female'];
    const ageGroups = ['ageGroup1', 'ageGroup2', 'ageGroup3',
        'ageGroup4', 'ageGroup5', 'ageGroup6', 'ageGroup7', 'ageGroup8'];
    const heightGroups = ['heightGroup1', 'heightGroup2', 'heightGroup3',
        'heightGroup4', 'heightGroup5', 'heightGroup6', 'heightGroup7',
        'heightGroup8', 'heightGroup9', 'heightGroup10'];
    for (let i = 0; i < sexGroups.length; i++) {
        for (let j = 0; j < ageGroups.length; j++) {
            for (let k = 0; k < heightGroups.length; k++) {
                let sum = 0;
                let mean = 0;
                let numObjects = 0;
                const lifts = [];
                admin.database().ref()
                    .child('healthUnverifiedUsers')
                    .child('bmr')
                    .child(sexGroups[i])
                    .child(ageGroups[j])
                    .child(heightGroups[k])
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
                    .then(function () {
                    // NOW create load a new array with data to fill the chart with
                    // NOTE: this can be done more efficiently in a previous loop
                    // but this is done for readability.
                    const liftColumns = new Array(14).fill(0);
                    for (let index = 0; index < lifts.length; ++index) {
                        if (lifts[index] > 0 && lifts[index] < 1000) {
                            liftColumns[0]++;
                        }
                        else if (lifts[index] >= 1000 && lifts[index] < 1100) {
                            liftColumns[1]++;
                        }
                        else if (lifts[index] >= 1100 && lifts[index] < 1200) {
                            liftColumns[2]++;
                        }
                        else if (lifts[index] >= 1200 && lifts[index] < 1300) {
                            liftColumns[3]++;
                        }
                        else if (lifts[index] >= 1300 && lifts[index] < 1400) {
                            liftColumns[4]++;
                        }
                        else if (lifts[index] >= 1400 && lifts[index] < 1500) {
                            liftColumns[5]++;
                        }
                        else if (lifts[index] >= 1500 && lifts[index] < 1600) {
                            liftColumns[6]++;
                        }
                        else if (lifts[index] >= 1600 && lifts[index] < 1700) {
                            liftColumns[7]++;
                        }
                        else if (lifts[index] >= 1700 && lifts[index] < 1800) {
                            liftColumns[8]++;
                        }
                        else if (lifts[index] >= 1800 && lifts[index] < 1900) {
                            liftColumns[9]++;
                        }
                        else if (lifts[index] >= 1900 && lifts[index] < 2000) {
                            liftColumns[10]++;
                        }
                        else if (lifts[index] >= 2000 && lifts[index] < 2100) {
                            liftColumns[11]++;
                        }
                        else if (lifts[index] >= 2100 && lifts[index] < 2200) {
                            liftColumns[12]++;
                        }
                        else {
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


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
exports.listener = exports.healthSumsUnverifiedTDEE = functions.https
    .onRequest((req, res) => {
    const sexGroups = ['male', 'female'];
    const ageGroups = ['ageGroup1', 'ageGroup2', 'ageGroup3',
        'ageGroup4', 'ageGroup5', 'ageGroup6', 'ageGroup7', 'ageGroup8'];
    const heightGroups = ['heightGroup1', 'heightGroup2', 'heightGroup3',
        'heightGroup4', 'heightGroup5', 'heightGroup6', 'heightGroup7',
        'heightGroup8', 'heightGroup9', 'heightGroup10'];
    for (let i = 0; i < sexGroups.length; i++) {
        for (let j = 0; j < ageGroups.length; j++) {
            for (let k = 0; k < heightGroups.length; k++) {
                let sum = 0;
                let mean = 0;
                let numObjects = 0;
                const lifts = [];
                admin.database().ref()
                    .child('healthUnverifiedUsers')
                    .child('tdee')
                    .child(sexGroups[i])
                    .child(ageGroups[j])
                    .child(heightGroups[k])
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
                    .then(function () {
                    // NOW create load a new array with data to fill the chart with
                    // NOTE: this can be done more efficiently in a previous loop
                    // but this is done for readability.
                    const liftColumns = new Array(24).fill(0);
                    for (let index = 0; index < lifts.length; ++index) {
                        if (lifts[index] > 0 && lifts[index] < 1100) {
                            liftColumns[0]++;
                        }
                        else if (lifts[index] >= 1100 && lifts[index] < 1200) {
                            liftColumns[1]++;
                        }
                        else if (lifts[index] >= 1200 && lifts[index] < 1300) {
                            liftColumns[2]++;
                        }
                        else if (lifts[index] >= 1300 && lifts[index] < 1400) {
                            liftColumns[3]++;
                        }
                        else if (lifts[index] >= 1400 && lifts[index] < 1500) {
                            liftColumns[4]++;
                        }
                        else if (lifts[index] >= 1500 && lifts[index] < 1600) {
                            liftColumns[5]++;
                        }
                        else if (lifts[index] >= 1600 && lifts[index] < 1700) {
                            liftColumns[6]++;
                        }
                        else if (lifts[index] >= 1700 && lifts[index] < 1800) {
                            liftColumns[7]++;
                        }
                        else if (lifts[index] >= 1800 && lifts[index] < 1900) {
                            liftColumns[8]++;
                        }
                        else if (lifts[index] >= 1900 && lifts[index] < 2000) {
                            liftColumns[9]++;
                        }
                        else if (lifts[index] >= 2000 && lifts[index] < 2100) {
                            liftColumns[10]++;
                        }
                        else if (lifts[index] >= 2100 && lifts[index] < 2200) {
                            liftColumns[11]++;
                        }
                        else if (lifts[index] >= 2200 && lifts[index] < 2300) {
                            liftColumns[12]++;
                        }
                        else if (lifts[index] >= 2300 && lifts[index] < 2400) {
                            liftColumns[13]++;
                        }
                        else if (lifts[index] >= 2400 && lifts[index] < 2500) {
                            liftColumns[14]++;
                        }
                        else if (lifts[index] >= 2500 && lifts[index] < 2600) {
                            liftColumns[15]++;
                        }
                        else if (lifts[index] >= 2600 && lifts[index] < 2700) {
                            liftColumns[16]++;
                        }
                        else if (lifts[index] >= 2700 && lifts[index] < 2800) {
                            liftColumns[17]++;
                        }
                        else if (lifts[index] >= 2800 && lifts[index] < 2900) {
                            liftColumns[18]++;
                        }
                        else if (lifts[index] >= 2900 && lifts[index] < 3000) {
                            liftColumns[19]++;
                        }
                        else if (lifts[index] >= 3000 && lifts[index] < 3100) {
                            liftColumns[20]++;
                        }
                        else if (lifts[index] >= 3100 && lifts[index] < 3200) {
                            liftColumns[21]++;
                        }
                        else if (lifts[index] >= 3200 && lifts[index] < 3300) {
                            liftColumns[22]++;
                        }
                        else {
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


/***/ })
/******/ ])));
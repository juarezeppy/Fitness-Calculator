"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/add-message/index.ts
const functions = require("firebase-functions");
exports.listener = exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});

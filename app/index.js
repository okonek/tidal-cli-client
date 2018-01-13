#!/usr/bin/env node
"use strict";

const fs = require("fs");
const SigninScreen = require("./UI/SigninScreen");
const startApp = require("./StartApp");

if(!fs.existsSync(__dirname + "/../config.js")) {
    let signinScreen = new SigninScreen();
    signinScreen.askForData(function() {
        startApp();
    });
}
else {
    startApp();
}

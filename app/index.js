#!/usr/bin/env node
"use strict";
const fs = require("fs");
const SigninScreen = require("./UI/SigninScreen");
const startApp = require("./StartApp");

(async () => {

    if (!fs.existsSync(process.env.HOME + "/.tidalConfig.js")) {
        let signinScreen = new SigninScreen();
        signinScreen.askForData(function () {
            startApp();
        });
    }
    else {
        startApp();
    }
})();

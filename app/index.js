#!/usr/bin/env node
"use strict";

const fs = require("fs");
const SigninScreen = require("./UI/SigninScreen");
const startApp = require("./StartApp");
const commandExists = require("command-exists");

const checkDependencies = async () => {
    let hasMpv, hasW3mImg;

    await commandExists("mpv").then(result => hasMpv = true, () => hasMpv = false);
    await commandExists("/usr/lib/w3m/w3mimgdisplay").then(result => hasW3mImg = true, () => hasW3mImg = false);

    if(!hasMpv) {
        console.log("You haven't got MPV installed");
    }

    if(!hasW3mImg) {
        console.log("You haven't got W3M-IMG installed");
    }

    if(!hasMpv || !hasW3mImg) {
        process.exit(1);
    }
};

(async () => {

    await checkDependencies();

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

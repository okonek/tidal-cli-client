#!/usr/bin/env node
"use strict";
const fs = require("fs");
const SigninScreen = require("./UI/SigninScreen");
const startApp = require("./StartApp");
const raven = require("raven");
const packageJson = require("../package.json");

raven.config("https://efdf3446813b44adab06794b2c031c6c@sentry.io/1189461", {
    captureUnhandledRejections: true,
    release: packageJson.version
}).install((err, sendErr, eventId) => {
    if(mainScreen) mainScreen.screen.destroy();

    if (!sendErr) {
        console.log("Successfully sent fatal error with eventId " + eventId + " to the developer");
        console.error(err.stack);
    }
    console.log("Paste this eventId in the Github issue, so I can help you faster");
    process.exit(1);
});

let mainScreen;

(async () => {
    if (!fs.existsSync(process.env.HOME + "/.tidalConfig.js")) {
        let signinScreen = new SigninScreen();
        signinScreen.askForData(async function () {
            mainScreen = await startApp();
        });
    }
    else {
        mainScreen = await startApp();
    }
})();

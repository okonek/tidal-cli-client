#!/usr/bin/env node
"use strict";

const raven = require("raven");
const packageJson = require("../package.json");
const AppConfiguration = require("./backend/Configuration/App");
let mainScreen;

raven.config("https://efdf3446813b44adab06794b2c031c6c@sentry.io/1189461", {
	captureUnhandledRejections: true,
	release: packageJson.version
}).install((err, sendErr, eventId) => {
	if(mainScreen) mainScreen.element.destroy();

	if (!sendErr) {
		console.log("Successfully sent fatal error with eventId " + eventId + " to the developer");
		console.error(err.stack);
	}
	console.log("Paste this eventId in the Github issue, so I can help you faster");
	process.exit(1);
});

const appConfiguration = new AppConfiguration();
appConfiguration.prepareConfigFile();

const MainScreen = require("./UI/MainScreen");
mainScreen = new MainScreen();

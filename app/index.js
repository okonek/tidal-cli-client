#!/usr/bin/env node
"use strict";

const raven = require("raven");
const packageJson = require("../package.json");
const AppConfiguration = require("./backend/Configuration/App");
const shell = require("shelljs");
const readline = require("readline");
const Screen = require("./UI/abstract/Screen");
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


const startApp = () => {
	const appConfiguration = new AppConfiguration();
	appConfiguration.prepareConfigFile();

	const appArguments = [];

	if(process.argv.includes("--no-images")) {
		appArguments.push("--no-images");
	}

	const MainScreen = require("./UI/MainScreen");
	mainScreen = new MainScreen(appArguments);
};

if(!shell.which("mpv")) {
	shell.exec(__dirname + "/installDependencies.sh");
	startApp();
}
else if(!(Screen.findFile("/usr", "w3mimgdisplay") || Screen.findFile("/lib", "w3mimgdisplay") || Screen.findFile("/bin", "w3mimgdisplay"))) {
	const inputInterface = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false
	});

	inputInterface.question("Would you like to install w3m-img to display images in app? (y/n): ", answer => {
		inputInterface.close();

		if(answer === "y" || answer === "Y") {
			shell.exec(__dirname + "/installDependencies.sh");
		}
		startApp();
	});
}
else {
	startApp();
}
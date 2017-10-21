"use strict";

const KeyboardEvents = require("./KeyboardEvents");
const TidalApi = require("./TidalApi");
const Navigation = require("./Navigation");
const config = require("../config");
let MainScreen = require("./UI/MainScreen");
const tidalApi = new TidalApi(config);
const PlayerPanel = require("./UI/PlayerPanel");
const Player = require("./Player");
let keyboardEvents = new KeyboardEvents();
let player = new Player(keyboardEvents);
const fs = require("fs");

process.on('uncaughtException', function (exception, error="f") {

    fs.writeFileSync("./error.log", exception.stack, "utf-8", () => {});
    console.log(exception); // to see your exception details in the console
    // if you are on production, maybe you can send the exception details to your
    // email as well ?
});

let navigation = new Navigation({
    tidalApi
});
let options = {
    tidalApi,
    player
};
let mainScreen = new MainScreen(options);

navigation.show(mainScreen);

const cleanup = (exit = false) => {
    player.stop();
    if(exit) {
        process.exit();
    }
};
process.on("exit", cleanup.bind(null, false));
process.on("SIGINT", cleanup.bind(null, true));
process.on("uncaughtException", cleanup.bind(null, true));
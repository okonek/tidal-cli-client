"use strict";

const KeyboardEvents = require("./KeyboardEvents");
const TidalApi = require("./TidalApi");
const Navigation = require("./Navigation");
const config = require("../config");
let MainScreen = require("./UI/MainScreen");
const tidalApi = new TidalApi(config);
const PlayerPanel = require("./UI/PlayerPanel");
const SearchPanel = require("./UI/SearchPanel");
const Player = require("./Player");
let keyboardEvents = new KeyboardEvents();
let player = new Player(keyboardEvents);


let navigation = new Navigation({
    tidalApi
});
let mainScreen = new MainScreen();
let options = {
    tidalApi,
    parent: mainScreen.screen,
    player
};
mainScreen.addItem(new PlayerPanel(options));
mainScreen.addItem(new SearchPanel(options));
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
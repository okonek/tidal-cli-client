"use strict";

const Player = require("./Player");
const KeyboardEvents = require("./KeyboardEvents");
const TidalApi = require("./TidalApi");

const config = require("../config");

const tidalApi = new TidalApi(config);

let keyboardEvents = new KeyboardEvents();
let player = new Player(keyboardEvents);

const TidalList = require("./UI/TidalList");
const Search = require("./Search");
const TidalMenu = require("./UI/TidalMenu");
const Navigation = require("./Navigation");
const NavigationItem = require("./NavigationItem");
const navigationItems = require("./NavigationItems");

let navigation = new Navigation(navigationItems.getItems(tidalApi, player));
navigation.show("menu");

const cleanup = (exit = false) => {
    player.stop();
    if(exit) {
        process.exit();
    }
};
process.on("exit", cleanup.bind(null, false));
process.on("SIGINT", cleanup.bind(null, true));
process.on("uncaughtException", cleanup.bind(null, true));


keyboardEvents.subscribe(() => {
    navigation.back();
}, {
    name: KeyboardEvents.keyboardKeys.ESCAPE
});
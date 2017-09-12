"use strict";

const TidalApi = require("./TidalApi");
const Track = require("./Track");
const Player = require("./Player");
const TidalList = require("./UI/TidalList");
const config = require("../config");
const Search = require("./Search");
const KeyboardEvents = require("./KeyboardEvents");
const TidalMenu = require("./UI/TidalMenu");

let keyboardEvents = new KeyboardEvents();
let player = new Player(keyboardEvents);

const cleanup = (exit = false) => {
    player.stop();
    if(exit) {
        process.exit();
    }
};
process.on("exit", cleanup.bind(null, false));
process.on("SIGINT", cleanup.bind(null, true));
process.on("uncaughtException", cleanup.bind(null, true));

const tidalApi = new TidalApi(config);

const search = async (type) => {
    let searchObject = new Search(tidalApi, type);
    let objects = await searchObject.ask();
    let objectsList = new TidalList("Gimme music", objects, type);

    let selectedObject = await objectsList.show();

    return selectedObject;
};

const artistsOption = async () => {
    let selectedArtist = await search(TidalApi.searchTypes.ARTISTS);
    await selectedArtist.updateTracks(tidalApi);

    let trackToPlay = await selectedArtist.tracksList.show();
    await trackToPlay.updateStreamURL(tidalApi);
    player.play(trackToPlay);
};

const tracksOption = async () => {
    let selectedTrack = await search(TidalApi.searchTypes.TRACKS);
    await selectedTrack.updateStreamURL(tidalApi);
    player.play(selectedTrack);
};

const start = async () => {
    let menu = new TidalMenu();
    let selectedOption = await menu.show();

    switch(selectedOption) {
        case TidalMenu.menuOptions.ARTISTS_SEARCH:
            artistsOption();
            break;

        case TidalMenu.menuOptions.TRACKS_SEARCH:
            tracksOption();
            break;
    }
};

start();
const TidalApi = require("./TidalApi");
const Track = require("./Track");
const Player = require("./Player");
const List = require("./UI/List");
const config = require("../config");
const Search = require("./Search");
const KeyboardEvents = require("./KeyboardEvents");

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
    let objectsList = new List("Gimme music", objects, type);
    let selectedObject = await objectsList.show();
    return selectedObject;
};

const start = async () => {
    let selectedArtist = await search(TidalApi.searchTypes().ARTISTS);
};

start();
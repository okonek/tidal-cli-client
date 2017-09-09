const TidalApi = require("./TidalApi");
const Track = require("./Track");
const Player = require("./Player");
const TracksList = require("./UI/TracksList");
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

const getTracksList = async (trackName) => {
    let tracks = await tidalApi.searchForTrack(trackName);
    return new TracksList("Gimme music", "id", tracks);
};

const start = async () => {
    let searchTrack = new Search(tidalApi, Search.searchTypes().TRACK);
    let tracks = await searchTrack.ask();
    let trackList = new TracksList("Gimme music", tracks);
    let selectedTrackId = await trackList.show();

    let streamURL = await tidalApi.getTrackURL(selectedTrackId);
    let track = new Track(streamURL);
    player.play(track);
};

start();
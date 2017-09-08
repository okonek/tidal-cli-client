const TidalApi = require("./TidalApi");
const Track = require("./Track");
const Player = require("./Player");
const TracksList = require("./UI/TracksList");
const Prompt = require("./UI/Prompt");
const config = require("../config");

let player = new Player();

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
    let trackNamePrompt = new Prompt("Enter track name:", "trackName");
    let trackName = (await trackNamePrompt.show()).trackName;
    let trackList = await getTracksList(trackName);
    
    let trackId = (await trackList.show()).id;

    let streamURL = await tidalApi.getTrackURL(trackId);
    let track = new Track(streamURL);

    player.play(track);
};

start();
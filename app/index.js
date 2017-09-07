const TidalApi = require("./TidalApi");
const Track = require("./Track");
const Player = require("./Player");
const TracksList = require("./UI/TracksList");
const Prompt = require("prompt");
const config = require("../config");

let player = new Player(config);

process.on("exit", () => {
    player.stop();
});

const tidalApi = new TidalApi();

const askForInput = (message) => {
    if(!message) {
        throw new Error("Message can't be null");
    }

    return new Promise((resolve) => {
        Prompt.get([message], (error, result) => {
            resolve(result[message]);
        });
    });
}; 

const getTracksList = async (trackName) => {
    let tracks = await tidalApi.searchForTrack(trackName);
    return new TracksList("Gimme music", "id", tracks);
};

const start = async () => {
    let trackName = await askForInput("track");
    let trackList = await getTracksList(trackName);
    
    let trackId = (await trackList.show()).id;

    let streamURL = await tidalApi.getTrackURL(trackId);
    let track = new Track("rtmp://" + streamURL);

    player.play(track);
};

start();
const MPV = require("node-mpv");

module.exports = class Player {
    constructor() {
        this.player = new MPV();
    }

    play(track) {
        this.player.load(track.streamURL);
    }

    stop() {
        this.player.stop();
    }
}
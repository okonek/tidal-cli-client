const MPV = require("node-mpv");
const KeyboardEvents = require("./KeyboardEvents");
const Observable = require("./Observable");

module.exports = class Player extends MPV {
    constructor() {
        super();
        this.playerEvents = new Observable();
        this.currentTrack = null;
    }

    tooglePlayback() {
        if(this.observed.path) {
            this.playerEvents.fire({
                type: Player.eventTypes.IS_PAUSED,
                value: this.observed.pause
            });
            this.togglePause();
        }
    }

    static get eventTypes() {
        return {
            IS_PAUSED: 0,
            TRACK_CHANGED: 1
        };
    }

    play(track) {
        this.currentTrack = track;
        this.playerEvents.fire({
            type: Player.eventTypes.TRACK_CHANGED
        });
        this.load(track.streamURL);
    }
};
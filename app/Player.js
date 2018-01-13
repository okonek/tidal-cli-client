const MPV = require("node-mpv");
const KeyboardEvents = require("./KeyboardEvents");
const Observable = require("./Observable");
const fs = require("fs");

module.exports = class Player extends MPV {
    constructor() {
        super();
        this.playerEvents = new Observable();
        this.currentTrack = null;
        this.queue = [];

        this.on("started", () => {
            this.currentTrack = this.queue.shift();
            this.playerEvents.fire({
                type: Player.eventTypes.TRACK_CHANGED
            });
        });
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
            TRACK_CHANGED: 1,
            QUEUE_UPDATED: 2
        };
    }

    addTrackToQueue(track) {
        if(this.queue.length === 0) {
            this.play(track);
        }
        else {
            this.queue.push(track);
            this.append(track.streamURL);
            this.playerEvents.fire({
                type: Player.eventTypes.QUEUE_UPDATED
            });
        }

    }

    play(track) {
        this.queue.unshift(track);
        this.load(track.streamURL);
    }
};
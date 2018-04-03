const MPV = require("node-mpv");
const Observable = require("./Observable");

module.exports = class Player extends MPV {
    constructor(tidalApi) {
        super();
        this.playerEvents = new Observable();
        this.currentTrack = null;
        this.queue = [];
        this.playing = false;
        this.tidalApi = tidalApi;

        this.on("stopped", () => {
            if(this.queue.length !== 0) {
                this.play(this.queue.shift());
            }
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

    skipTracks(tracksCount) {
        if(tracksCount <= this.queue.length) {
            let currentTrack;

            for(let i = 0; i < tracksCount; i++) {
                currentTrack = this.queue.shift();
            }

            this.play(currentTrack);
        }

    }

    addTrackToQueue(track) {
        if(!this.playing) {
            this.play(track);
        }
        else {
            this.queue.push(track);
            this.playerEvents.fire({
                type: Player.eventTypes.QUEUE_UPDATED
            });
        }

    }

    playTrackNext(track) {
        if(!this.playing) {
            this.play(track);
        }
        else {
            this.queue.unshift(track);
            this.playerEvents.fire({
                type: Player.eventTypes.QUEUE_UPDATED
            });
        }

    }

    play(track) {
        if(this.playing) {
            this.pause();
        }
        this.playing = true;
        this.currentTrack = track;
        this.playerEvents.fire({
            type: Player.eventTypes.TRACK_CHANGED
        });
        track.updateStreamURL(this.tidalApi).then(() => {
            this.resume();
            this.load(track.streamURL);
        });
    }
};
const MPV = require("node-mpv");
const KeyboardEvents = require("./KeyboardEvents");
const Observable = require("./Observable");

module.exports = class Player extends MPV {
    constructor(keyboardEvents) {
        super();
        this.playerEvents = new Observable();
        this.currentTrack = null;
        keyboardEvents.subscribe((key) => {
            if(key.ctrl) {
                switch(key.name) {
                    case KeyboardEvents.keyboardKeys.S:
                        if(this.observed.path) {
                            this.playerEvents.fire({
                                type: Player.eventTypes.IS_PAUSED,
                                value: this.observed.pause
                            });
                            this.togglePause();
                        }
                        break;
                }
            }
        });
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
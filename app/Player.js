const MPV = require("node-mpv");
const KeyboardEvents = require("./KeyboardEvents");

module.exports = class Player extends MPV{
    constructor(keyboardEvents) {
        super();
        this.paused = false;
        this.started = false;

        const reversePlaybackValues = (isPlaying) => {
            this.paused = !isPlaying;
            this.started = isPlaying;
        };

        this.on("paused", reversePlaybackValues.bind(null, false));
        this.on("resumed", reversePlaybackValues.bind(null, true));
        this.on("started", reversePlaybackValues.bind(null, true));

        keyboardEvents.subscribe((key) => {
            switch(key.name) {
                case KeyboardEvents.keyboardKeys().SPACE:
                    if(this.started) {
                        this.pause();
                    }
                    else if(this.paused) {
                        this.resume();
                    }
                    break;
            }
        });
    }

    play(track) {
        this.load(track.streamURL);
    }
}
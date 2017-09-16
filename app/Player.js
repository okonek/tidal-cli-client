const MPV = require("node-mpv");
const KeyboardEvents = require("./KeyboardEvents");

module.exports = class Player extends MPV{
    constructor(keyboardEvents) {
        super();

        keyboardEvents.subscribe((key) => {
            if(key.ctrl) {
                switch(key.name) {
                    case KeyboardEvents.keyboardKeys.S:
                        if(this.observed.path) {
                            this.togglePause();
                        }
                        break;
                }
            }
        });
    }

    play(track) {
        this.load(track.streamURL);
    }
}
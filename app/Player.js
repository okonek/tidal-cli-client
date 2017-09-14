const MPV = require("node-mpv");
const KeyboardEvents = require("./KeyboardEvents");

module.exports = class Player extends MPV{
    constructor(keyboardEvents) {
        super();

        keyboardEvents.subscribe((key) => {
            switch(key.name) {
                case KeyboardEvents.keyboardKeys().SPACE:
                    if(this.observed.path) {
                        this.tooglePause();
                    }
                    break;
            }
        });
    }

    play(track) {
        this.load(track.streamURL);
    }
}
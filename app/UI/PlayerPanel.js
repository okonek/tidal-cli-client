const blessed = require("blessed");
const Player = require("../Player");

module.exports = class extends blessed.box {
    constructor(options) {
        super({
            width: "100%",
            height: "20%",
            border: {
                type: "line"
            },
            style: {
                border: {
                    fg: "#FFFFFF"
                }
            },
            bottom: 0,
        });
        this.screen = options.screen;
        this.player = new Player();
        this.setupKeyboardEvents();

        this.trackTitleBox = new blessed.text();

        this.updateTrackTitleBox();

        this.player.playerEvents.subscribe(() => {
            this.updateTrackTitleBox();
        }, {
            type: Player.eventTypes.TRACK_CHANGED
        });

        this.append(this.trackTitleBox);
    }

    setupKeyboardEvents() {
        this.screen.key(["C-s"], () => {
            this.player.tooglePlayback();
        });
    }

    updateTrackTitleBox() {
        this.trackTitleBox.setContent(this.player.currentTrack ? this.player.currentTrack.title : "No track");
        this.screen.render();
    }
};
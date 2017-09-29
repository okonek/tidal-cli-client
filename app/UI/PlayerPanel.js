const blessed = require("blessed");
const Player = require("../Player");

module.exports = class extends blessed.box {
    constructor(parent, player) {
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

        let trackTitleBox = new blessed.text();

        let updateTrackTitleBox = () => {
            trackTitleBox.setContent(player.currentTrack ? player.currentTrack.title : "No track");
            parent.render();
        };

        updateTrackTitleBox();


        player.playerEvents.subscribe(() => {
            updateTrackTitleBox();
        }, {
            type: Player.eventTypes.TRACK_CHANGED
        });

        this.append(trackTitleBox);
    }
};
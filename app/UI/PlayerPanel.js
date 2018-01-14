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

        this.trackTitleBox = blessed.text();
        this.nextTrackTitleBox = blessed.text({
            parent: this,
            left: "50%",
        });

        this.updateTrackTitleBox();

        this.player.playerEvents.subscribe((event) => {
            if(event.type === Player.eventTypes.TRACK_CHANGED || event.type === Player.eventTypes.QUEUE_UPDATED) {
                this.updateTrackTitleBox();
            }
        });

        this.append(this.trackTitleBox);
        this.append(this.nextTrackTitleBox);
    }

    setupKeyboardEvents() {
        this.screen.key(["C-s"], () => {
            this.player.tooglePlayback();
        });
    }

    getCurrentTrackTitle() {
        return this.player.currentTrack ? this.player.currentTrack.title : "No track";
    }

    getNextTrackTitle() {
        return this.player.queue.length > 0 ? "Next: " + this.player.queue[0].title : "No next";
    }

    updateTrackTitleBox() {
        this.trackTitleBox.setContent(this.getCurrentTrackTitle());
        this.nextTrackTitleBox.setContent(this.getNextTrackTitle());
        this.screen.render();
    }
};
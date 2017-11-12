const blessed = require("blessed");
const ASCIIText = require("./ASCIIText");
const SquareImage = require("./SquareImage");
const TracksList = require("./TracksList");

module.exports = class extends blessed.box {
    constructor(options, artist) {
        super({
            height: "80%",
            parent: options.screen
        });
        this.options = options;
        this.artist = artist;

        this.communicationEventTypes = require("./MainScreen").eventTypes;
        this.communicationEvents = options.communicationEvents;

        this.artistNameBox = new ASCIIText({
            parent: options.screen,
            content: artist.name,
            width: "40%",
            left: 0,
        });
        options.screen.append(this.artistNameBox);

        this.artistImage = new SquareImage(
            Object.assign({}, options, {
                parent: options.screen,
                width: 0.2,
                file: artist.artSrc,
                right: 0
        }));
        options.screen.append(this.artistImage);
        this.artistImage.show();

        this.showTracksList();

        options.screen.render();
    }

    showTracksList() {
        this.tracksList = new TracksList({
            parent: this.options.screen,
            width: "40%",
            height: "80%",
            left: "40%",
        }, this.artist.tracks);
        this.tracksList.on("select", async (item, index) => {
            let track = this.artist.tracks[index];
            this.communicationEvents.fire({
                type: this.communicationEventTypes.PLAY_TRACK,
                track: track
            });
        });
        this.options.screen.append(this.tracksList);

        this.tracksList.show();
        this.tracksList.focus();

    }

    hide() {
        this.artistNameBox.hide();
        this.artistImage.hide();
    }
};
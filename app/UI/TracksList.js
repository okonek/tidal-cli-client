const List = require("./List");
const robotjs = require("robotjs");
const fs = require("fs");

module.exports = class extends List {
    constructor(options, tracks) {
        let tracksDescriptions = tracks.map(track => {
                let trackLabel = track.title + " - ";
                track.artists.forEach((artist) => {
                    trackLabel += artist.name + " ";
                });
                return trackLabel;
            }
        );
        super(options, tracksDescriptions);

        this.communicationEventTypes = require("./MainScreen").eventTypes;
        this.communicationEvents = options.communicationEvents;
        this.listSelectEvent = this.communicationEventTypes.PLAY_TRACK;


        this.on("select", async (item, index) => {
            let track = tracks[index];

            this.communicationEvents.fire({
                type: this.listSelectEvent,
                track: track
            });
            this.listSelectEvent = this.communicationEventTypes.PLAY_TRACK;
        });

        this.key(["n"], () => {
            this.listSelectEvent = this.communicationEventTypes.ADD_TRACK_TO_QUEUE;
            robotjs.keyTap("enter");
        });
    }
};
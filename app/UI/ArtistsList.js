const List = require("./List");

module.exports = class extends List {
    constructor(options, artists) {
        let artistsDescriptions = artists.map(artist => artist.name);
        super(options, artistsDescriptions);

        this.communicationEventTypes = require("./MainScreen").eventTypes;
        this.communicationEvents = options.communicationEvents;

        this.on("select", (item, index) => {
            let artist = artists[index];
            this.communicationEvents.fire({
                type: this.communicationEventTypes.SHOW_ARTIST_PANEL,
                artist
            });
        });
    }
};
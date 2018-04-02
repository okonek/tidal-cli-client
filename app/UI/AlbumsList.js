const List = require("./List");

module.exports = class extends List {
    constructor(options, albums) {
        let albumsDescriptions = albums.map(album => {
                let albumLabel = album.title + " - ";
                album.artists.forEach((artist) => {
                    albumLabel += artist.name + " ";
                });
                return albumLabel;
            }
        );
        super(options, albumsDescriptions);

        this.communicationEventTypes = require("./MainScreen").eventTypes;
        this.communicationEvents = options.communicationEvents;

        this.on("select", (item, index) => {
            let album = albums[index];
            this.communicationEvents.fire({
                type: this.communicationEventTypes.SHOW_ALBUM_PANEL,
                album
            });
        });
    }
};
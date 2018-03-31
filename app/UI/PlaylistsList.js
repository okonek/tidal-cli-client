const List = require("./List");

module.exports = class extends List {
    constructor(options, playlists) {
        let playlistsDescriptions = playlists.map(playlist => {
                return playlist.name;
            }
        );
        super(options, playlistsDescriptions);

        this.communicationEventTypes = require("./MainScreen").eventTypes;
        this.communicationEvents = options.communicationEvents;
        this.on("select", (item, index) => {
            let playlist = playlists[index];
            this.communicationEvents.fire({
                type: this.communicationEventTypes.SHOW_PLAYLIST_PANEL,
                playlist
            });
        });
    }
};
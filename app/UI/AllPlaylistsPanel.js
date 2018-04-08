const blessed = require("blessed");
const ASCIIText = require("./ASCIIText");
const TracksList = require("./TracksList");
const Playlist = require("../Playlist");
const PlaylistsList = require("./PlaylistsList");

module.exports = class extends blessed.box {
    constructor(options) {
        super({
            parent: options.parent,
        });
        this.options = options;
        this.playlists = [];
        this.tidalApi = this.options.tidalApi;
        this.communicationEvents = this.options.communicationEvents;


        this.tidalApi.getUserPlaylists(this.tidalApi.getMyID()).then((playlistsObjects) => {
            this.playlists = playlistsObjects.map((playlistObject) => {
                return new Playlist(playlistObject);
            });
            this.showPlaylistsList();
        }).catch(() => {
            this.showError();
        });


    }

    showError() {
        this.errorObject = blessed.text({
            parent: this,
            fg: "red",
            top: "center",
            left: "center",
            content: "You have no playlists"
        });

        this.errorObject.show();
        this.options.screen.render();
    }

    showPlaylistsList() {
        this.playlistsList = new PlaylistsList({parent: this,
            width: "100%",
            height: "100%",
            communicationEvents: this.communicationEvents
        }, this.playlists);

        this.playlistsList.show();
        this.playlistsList.focus();
        this.options.screen.render();
    }
};
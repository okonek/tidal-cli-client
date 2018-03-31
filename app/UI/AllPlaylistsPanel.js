const blessed = require("blessed");
const ASCIIText = require("./ASCIIText");
const SquareImage = require("./Image");
const TracksList = require("./TracksList");
const TidalApi = require("../TidalApi");
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
        });


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
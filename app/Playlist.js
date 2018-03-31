const fs = require("fs");

module.exports = class {
    constructor(playlistObject) {
        this.uuid = playlistObject.uuid;
        this.name = playlistObject.title;
        this.description = playlistObject.description;
        this.artId = playlistObject.image;
    }

    async updatePlaylistTracks(tidalApi) {
        this.tracks = await tidalApi.getTracksFromPlaylist(this);
    }

    async updateArt(tidalApi) {
        this.artSrc = await tidalApi.downloadImage(this.artId, 750, 500);
    }

};
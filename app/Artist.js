const TidalApi = require("./TidalApi");

module.exports = class Artist{
    constructor(artistObject) {
        this.id = artistObject.id;
        this.name = artistObject.name;
        this.tracks = [];
        this.tracksList = null;
    }

    updateTracks(tidalApi) {
        return new Promise((resolve, reject) => {
            tidalApi.getTopTracks({id: this.id, limit: 50}, (tracks) => {
                this.tracks = tracks.items;
                resolve();
            });
        });
    }
    
};
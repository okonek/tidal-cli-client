const TidalApi = require("./TidalApi");

module.exports = class Artist{
    constructor(artistObject) {
        this.id = artistObject.id;
        this.name = artistObject.name;
        this.tracks;
        this.tracksList;
    }

    updateTracks(tidalApi) {
        return new Promise((resolve, reject) => {
            tidalApi.getTopTracks({id: this.id, limit: 5}, (tracks) => {
                this.tracks = tracks.items;
                let TidalList = require("./UI/TidalList");
                this.tracksList = new TidalList("Wich one of do you want?", this.tracks, TidalApi.searchTypes.TRACKS);
                resolve();
            });
        });
    }
    
}
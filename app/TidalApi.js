const Api = require("tidalapi");


module.exports = class TidalApi extends Api {
    constructor(apiOptions) {
        super(apiOptions);
    }

    static get searchTypes() {
        return {
            TRACKS: "tracks",
            ARTISTS: "artists"
        };
    }

    searchFor(query, type) {
        return new Promise((resolve, reject) => {
            this.search({ type: type, query, limit: 50}, (result) => {
                resolve(result[type].items);
            });
        });
    };

    getTrackURL(track) {
        return new Promise((resolve, reject) => {
            this.getStreamURL({id: track.id}, (trackData) => {
                resolve("rtmp://" + trackData.url);
            });
        });
    };
}
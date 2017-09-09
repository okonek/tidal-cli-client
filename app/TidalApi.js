const Api = require("tidalapi");


module.exports = class TidalApi extends Api {
    constructor(apiOptions) {
        super(apiOptions);
    }

    static searchTypes() {
        return {
            TRACKS: "tracks",
            ARTISTS: "artists"
        };
    }

    searchFor(query, type) {
        return new Promise((resolve, reject) => {
            this.search({ type: type, query, limit: 10}, (result) => {
                resolve(result[type].items);
            });
        });
    };

    getTrackURL(trackId) {
        return new Promise((resolve, reject) => {
            this.getStreamURL({id: trackId}, (trackData) => {
                resolve("rtmp://" + trackData.url);
            });
        });
    };
}
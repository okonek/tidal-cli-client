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
        if(type instanceof Array) {
            type = type.toString();
        }

        return new Promise((resolve, reject) => {
            this.search({ type: type, query, limit: 50}, (result) => {
                if(result[type]) {
                    resolve(result[type].items);
                }
                else {
                    reject(result);
                }
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
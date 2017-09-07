const Api = require("tidalapi");


module.exports = class TidalApi extends Api {
    constructor(apiOptions) {
        super(apiOptions);
    }

    static searchTypes() {
        return {
            tracks: "tracks"
        };
    }

    searchForTrack(query) {
        return new Promise((resolve, reject) => {
            this.search({ type: TidalApi.searchTypes().tracks, query, limit: 10}, (result) => {
                resolve(result.tracks.items);
            });
        });
    };

    getTrackURL(trackId) {
        return new Promise((resolve, reject) => {
            this.getStreamURL({id: trackId}, (trackData) => {
                resolve(trackData.url);
            });
        });
    };
}
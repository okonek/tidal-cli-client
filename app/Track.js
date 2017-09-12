module.exports = class Track {
    constructor(trackObject) {
        this.id = trackObject.id;
        this.title = trackObject.title;
        this.streamURL;
    }

    async updateStreamURL(tidalApi) {
        this.streamURL = await tidalApi.getTrackURL(this);
    }
}
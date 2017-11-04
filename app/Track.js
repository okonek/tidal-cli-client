module.exports = class Track {
    constructor(trackObject) {
        this.id = trackObject.id;
        this.title = trackObject.title;
    }

    async updateStreamURL(tidalApi) {
        this.streamURL = await tidalApi.getTrackURL(this);
    }
};
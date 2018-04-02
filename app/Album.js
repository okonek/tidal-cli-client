module.exports = class Album {
    constructor(albumObject) {
        this.id = albumObject.id;
        this.title = albumObject.title;
        this.artists = albumObject.artists;
        this.coverArtId = albumObject.cover;
        this.tracks = [];
    }

    async updateTracks(tidalApi) {
        this.tracks = await tidalApi.getTracksFromAlbum(this);
    }

    async updateCoverArt(tidalApi) {
        this.coverArtSrc = await tidalApi.downloadImage(this.coverArtId, 750, 750);
    }
};
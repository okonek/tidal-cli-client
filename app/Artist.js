module.exports = class Artist {
    constructor(artistObject) {
        this.id = artistObject.id;
        this.name = artistObject.name;
        this.tracks = [];
        this.artistObject = artistObject;
        this.artId = artistObject.picture;
    }

    async updateTracks(tidalApi) {
        this.tracks = await tidalApi.getArtistTopTracks(this);
    }

    async updateArt(tidalApi) {
        if(this.artId) {
            this.artSrc = await tidalApi.downloadImage(this.artId, 750, 500);
        }
    }

    async updateAlbums(tidalApi) {
        this.albums = await tidalApi.getAlbumsOfArtist(this);
    }


    
};
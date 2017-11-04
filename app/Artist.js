const https = require("https");
const fs = require("fs");
const sharp = require("sharp");

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

    updateArt(tidalApi) {
        return new Promise((resolve, reject) => {
            this.artURL = tidalApi.getArtURL(this.artId, 750, 750);
            this.artSrc = "image_cache/" + this.artId + ".jpg";
            let artFile = fs.createWriteStream(this.artSrc);
            https.get(this.artURL, response => {
                response.pipe(artFile);
                resolve();
            });
        });
    }

    
};
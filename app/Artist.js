const https = require("https");
const fs = require("fs");

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
            this.mkdirSync("/tmp/tidal-cli-client");
            this.artURL = tidalApi.getArtURL(this.artId, 750, 750);
            this.artSrc = "/tmp/tidal-cli-client/" + this.artId + ".jpg";
            let artFile = fs.createWriteStream(this.artSrc);
            https.get(this.artURL, response => {
                response.pipe(artFile);
                resolve();
            });
        });
    }

    mkdirSync(dirPath) {
        try {
            fs.mkdirSync(dirPath)
        } catch (err) {
            if (err.code !== "EXIST") throw err;
        }
    }

    
};
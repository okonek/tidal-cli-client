const Api = require("tidalapi");
const Track = require("./Track");
const fs = require("fs");
const https = require("https");
const Album = require("./Album");

module.exports = class TidalApi extends Api {
    constructor(apiOptions) {
        super(apiOptions);
    }

    static get searchTypes() {
        return {
            TRACKS: "tracks",
            ARTISTS: "artists",
            PLAYLISTS: "playlists",
            ALBUMS: "albums"
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
                resolve(trackData.url);
            });
        });
    };

    getUserPlaylists(userId) {
        return new Promise((resolve, reject) => {
            this.getPlaylists(userId, (result) => {
                if(result.items && result.items.length > 0) {
                    resolve(result.items);
                }
                reject();
            });
        });
    }

    getTracksFromPlaylist(playlist) {
        return new Promise((resolve) => {
           this.getPlaylistTracks({id: playlist.uuid}, (playlistTracks) => {
               resolve(playlistTracks.items.map((trackObject) => new Track(trackObject)));
           })
        });
    }

    getTracksFromAlbum(album) {
        return new Promise((resolve) => {
            this.getAlbumTracks({id: album.id}, (tracks) => {
                resolve(tracks.items.map((trackObject) => new Track(trackObject)));
            });
        });
    }

    getArtistTopTracks(artist) {
        return new Promise((resolve) => {
            this.getTopTracks({id: artist.id, limit: 10}, (tracks) => {
                resolve(tracks.items.map((trackObject) => new Track(trackObject)));
            });
        });
    }

    downloadImage(artId, width = 750, height = 750) {
        return new Promise((resolve, reject) => {
            this.mkdirSync("/tmp/tidal-cli-client");
            let artURL = this.getArtURL(artId, width, height);
            let artSrc = "/tmp/tidal-cli-client/" + artId + ".jpg";
            let artFile = fs.createWriteStream(artSrc);
            https.get(artURL, response => {
                response.pipe(artFile);
                resolve(artSrc);
            });
        });
    }

    getAlbumsOfArtist(artist) {
        return new Promise((resolve) => {
            this.getArtistAlbums({id: artist.id}, (albums) => {
                resolve(albums.items.map((albumObject) => new Album(albumObject)));
            });
        });
    }

    mkdirSync(dirPath) {
        if(!fs.existsSync(dirPath)) {
            try {
                fs.mkdirSync(dirPath)
            } catch (err) {
                if (err.code !== "EEXIST") throw err;
            }
        }
    }
};
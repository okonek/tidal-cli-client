const chai = require("chai");
const nodeFetch = require("node-fetch");

const expect = chai.expect;
const ApiWrapper = require("../../app/backend/api/ApiWrapper");
const ApiInterface = require("../../app/backend/api/ApiInterface");
const modelsBySearchTypes = require("../../app/backend/models/modelsBySearchTypes");

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const properSearchQuery = "Stevie Ray Vaughan";
const playlistUuid = "abcfff2f-6f6b-47a4-ba1e-0a41c61aea2d";
const trackId = "42233596";
const albumId = "16268250";
const artistId = "111";
let api;


describe("ApiWrapper", async () => {

    beforeEach(() => {
        api = new ApiWrapper();
    });

    describe("login()", async () => {
        it("login() should user data object if valid creditnails are passed", async () => {
            let result = await api.login(username, password);
            expect(result.userId).to.be.a("number");
        });

        it("login() should return an error if invalid creditnals are passed", async () => {
            let error;

            try {
                await api.login("", "");
            }
            catch(e) {
                error = e;
            }

            expect(error).to.be.an("error");
        });
    });

    describe("apiGetMethods", async () => {
        beforeEach(async () => {
            api = new ApiWrapper();
            await api.login(username, password);
        });

        it("search() should return a list of max 10 with correct type objects if called with a proper query and type and limit 10", async () => {
            Object.keys(ApiInterface.SEARCH_TYPES).map(async x => {
                let results = await api.search(properSearchQuery, ApiInterface.SEARCH_TYPES[x], 10);

                expect(results).to.not.have.lengthOf.above(10);
                expect(results[0]).to.be.an.instanceof(modelsBySearchTypes(ApiInterface.SEARCH_TYPES[x]));
            });
        });

        it("getPlaylist() should return a playlist object if called with correct uuid", async () => {
            let playlist = await api.getPlaylist(playlistUuid);

            expect(playlist).to.be.an.instanceof(modelsBySearchTypes(ApiInterface.SEARCH_TYPES.PLAYLISTS));
        });

        it("getTrack() should return a track object if called with correct id", async () => {
            let track = await api.getTrack(trackId);

            expect(track).to.be.an.instanceof(modelsBySearchTypes(ApiInterface.SEARCH_TYPES.TRACKS));
        });

        it("getAlbum() should return an album object if called with correct id", async () => {
            let album = await api.getAlbum(albumId);

            expect(album).to.be.an.instanceof(modelsBySearchTypes(ApiInterface.SEARCH_TYPES.ALBUMS));
        });

        it("getArtist() should return an artist object if called with correct id", async () => {
            let artist = await api.getArtist(artistId);

            expect(artist).to.be.an.instanceof(modelsBySearchTypes(ApiInterface.SEARCH_TYPES.ARTISTS));
        });

        describe("album get functions", async () => {
            let album;

            beforeEach(async () => {
                album = await api.getAlbum(albumId);
            });

            it("getAlbumTracks() should return a list of track objects if called with a proper album object", async () => {
                let results = await api.getAlbumTracks(album);

                expect(results).to.be.an("array");
                expect(results[0]).to.be.an.instanceof(modelsBySearchTypes(ApiInterface.SEARCH_TYPES.TRACKS));
            });

            it("getAlbumArtUrl() should return an artUrl if called with a proper album cover art id", async () => {
                let artUrl = await api.getAlbumArtUrl(album.coverArt);
                let response = await nodeFetch(artUrl);

                expect(artUrl).to.be.a("string");
                expect(response.ok).to.be.true;
            });
        });

        describe("playlist get functions", async () => {
            let playlist;

            beforeEach(async () => {
                playlist = await api.getPlaylist(playlistUuid);
            });

            it("getPlaylistTracks() should return a list of track objects if called with a proper playlist object", async () => {
                let results = await api.getPlaylistTracks(playlist);

                expect(results).to.be.an("array");
                expect(results[0]).to.be.an.instanceof(modelsBySearchTypes(ApiInterface.SEARCH_TYPES.TRACKS));
            });

            it("getUserPlaylists() should return a list of playlist objects", async () => {
                let results = await api.getUserPlaylists();

                expect(results).to.be.an("array");
                expect(results[0]).to.be.an.instanceof(modelsBySearchTypes(ApiInterface.SEARCH_TYPES.PLAYLISTS));
            });
        });

        describe("artist get functions", async () => {
            let artist;

            beforeEach(async () => {
                artist = await api.getArtist(artistId);
            });

            it("getArtistTopTracks() should return a list of track objects if called with a proper artist object", async () => {
                let results = await api.getArtistTopTracks(artist);

                expect(results).to.be.an("array");
                expect(results[0]).to.be.an.instanceof(modelsBySearchTypes(ApiInterface.SEARCH_TYPES.TRACKS));
            });

            it("getArtistAlbums() should return a list of album objects if called with a proper artist object", async () => {
                let results = await api.getArtistAlbums(artist);

                expect(results).to.be.an("array");
                expect(results[0]).to.be.an.instanceof(modelsBySearchTypes(ApiInterface.SEARCH_TYPES.ALBUMS));
            });

            it("getArtistArtUrl() should return an artUrl if called with a proper artist picture id", async () => {
                let artUrl = await api.getArtistArtUrl(artist.picture);
                let response = await nodeFetch(artUrl);

                expect(artUrl).to.be.a("string");
                expect(response.ok).to.be.true;
            });
        });

        describe("track get functions", async () => {
            let track;

            beforeEach(async () => {
                track = await api.getTrack(trackId);
            });

            it("getTrackStreamUrl should return an url if called with a proper track id", async () => {
                let streamUrl = await api.getTrackStreamUrl(track.id);
                let response = await nodeFetch(streamUrl);

                expect(streamUrl).to.be.a("string");
                expect(response.ok).to.be.true;
            });
        });
    });
});

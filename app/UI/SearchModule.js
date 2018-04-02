const TracksList = require("./TracksList");
const ArtistsList = require("./ArtistsList");
const TidalApi = require("../TidalApi");
const Artist = require("../Artist");
const Track = require("../Track");
const ArtistPanel = require("./ArtistPanel");
const Album = require("../Album");
const AlbumsList = require("./AlbumsList");
const BaseModule = require("./BaseModule");

module.exports = class extends BaseModule {
    constructor(options) {
        super(options);
        this.listSelectEvent = this.communicationEventTypes.PLAY_TRACK;
    }

    run() {
        this.resetUI();

        this.searchBox.readInput(async (error, value) => {
            let searchType = TidalApi.searchTypes.TRACKS;
            let searchResults;

            switch(value) {
                case "track":
                    searchType = TidalApi.searchTypes.TRACKS;
                    break;

                case "artist":
                    searchType = TidalApi.searchTypes.ARTISTS;
                    break;

                case "album":
                    searchType = TidalApi.searchTypes.ALBUMS;
                    break;

                default:
                    searchResults = await this.tidalApi.searchFor(value, searchType);
                    this.screen.remove(this.searchBox);
                    break;
            }
            if(!searchResults) {
                searchResults = await this.searchFor(searchType);
            }
            searchResults = this.prepareTidalObjects(searchType, searchResults);
            this.showSearchResults(searchType, searchResults);
        });
    }

    searchFor(type) {
        return new Promise((resolve) => {
            this.resetUI();
            this.searchBox.readInput(async (error, value) => {
                let searchResults = await this.tidalApi.searchFor(value, type);
                this.screen.remove(this.searchBox);
                resolve(searchResults);
            });
        });
    }


    prepareTidalObjects(searchType, elements) {
        return elements.map(element => {
            switch (searchType) {
                case TidalApi.searchTypes.TRACKS:
                    return new Track(element);
                    break;

                case TidalApi.searchTypes.ARTISTS:
                    return new Artist(element);
                    break;

                case TidalApi.searchTypes.ALBUMS:
                    return new Album(element);
                    break;
            }
        });
    }

    showSearchResults(searchType, elements) {
        this.searchResultsList = this.getList(searchType, elements);


        this.screen.append(this.searchResultsList);

        this.searchResultsList.focus();
        this.searchResultsList.show();
        this.searchBox.hide();

        this.screen.render();

        this.searchResultsList.on("select", () => {
            this.screen.remove(this.searchResultsList);
            this.searchResultsList = null;
            this.screen.render();

            this.communicationEvents.fire({
                type: this.communicationEventTypes.SHOW_CURRENT_PANEL,
            });
        });

        this.communicationEvents.fire({
            type: this.communicationEventTypes.HIDE_CURRENT_PANEL,
        });

    }

    getList(searchType, elements) {
        switch (searchType) {
            case TidalApi.searchTypes.TRACKS:
                return this.getTracksList(elements);
                break;

            case TidalApi.searchTypes.ARTISTS:
                return this.getArtistsList(elements);
                break;

            case TidalApi.searchTypes.ALBUMS:
                return this.getAlbumsList(elements);
                break;
        }
    }

    getTracksList(tracks) {
        return new TracksList({
            communicationEvents: this.communicationEvents,
            parent: this.screen,
        }, tracks);
    }

    getAlbumsList(albums) {
        return new AlbumsList({
            communicationEvents: this.communicationEvents,
            parent: this.screen,
        }, albums);
    }

    getArtistsList(artists) {
        return new ArtistsList({
            parent: this.screen,
            communicationEvents: this.communicationEvents
        }, artists);
    }
};
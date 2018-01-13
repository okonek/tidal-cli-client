const blessed = require("blessed");
const TracksList = require("./TracksList");
const ArtistsList = require("./ArtistsList");
const TidalApi = require("../TidalApi");
const Artist = require("../Artist");
const Track = require("../Track");
const ArtistPanel = require("./ArtistPanel");
const fs = require("fs");
const robotjs = require("robotjs");

module.exports = class {
    constructor(options) {
        this.screen = options.screen;
        this.communicationEventTypes = require("./MainScreen").eventTypes;
        this.communicationEvents = options.communicationEvents;
        this.listSelectEvent = this.communicationEventTypes.PLAY_TRACK;
        this.tidalApi = options.tidalApi;

        this.searchBox = new blessed.Textbox({
            parent: this.screen,
            height: "5%",
            top: "80%",
            left: "1%",
            bg: "#535253"
        });
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

    resetUI() {
        if(this.searchResultsList) {
            this.searchResultsList.hide();
        }
        this.screen.append(this.searchBox);
        this.searchBox.clearValue();
        this.searchBox.show();
        this.searchBox.focus();
        this.screen.render();
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

                case TidalApi.searchTypes.ARTISTS:
                    return new Artist(element);
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
        }
    }

    getTracksList(tracks) {
        let tracksList = new TracksList({
            parent: this.screen,
        }, tracks);

        tracksList.on("select", async (item, index) => {
            let track = tracks[index];

            this.communicationEvents.fire({
                type: this.listSelectEvent,
                track: track
            });
            this.listSelectEvent = this.communicationEventTypes.PLAY_TRACK;
        });

        tracksList.key(["n"], () => {
            this.listSelectEvent = this.communicationEventTypes.ADD_TRACK_TO_QUEUE;
            robotjs.keyTap("enter");
        });
        return tracksList;
    }

    getArtistsList(artists) {
        let artistsList = new ArtistsList({
            parent: this.screen,
        }, artists);

        artistsList.on("select", (item, index) => {
            let artist = artists[index];
            this.communicationEvents.fire({
                type: this.communicationEventTypes.SHOW_ARTIST_PANEL,
                artist
            });
        });
        return artistsList;
    }
};
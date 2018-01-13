const NavigationItem = require("../NavigationItem");
const blessed = require("blessed");
const TracksList = require("./TracksList");
const TidalApi = require("../TidalApi");
const Track = require("../Track");
const PlayerPanel = require("./PlayerPanel");
const Player = require("../Player");
const Artist = require("../Artist");
const SearchModule = require("./SearchModule");
const ActivityPanel = require("./ActivityPanel");
const Observable = require("../Observable");
const fs = require("fs");

module.exports = class MainScreen extends NavigationItem {

    static get eventTypes() {
        return {
            PLAY_TRACK: 0,
            ADD_TRACK_TO_QUEUE: 1,
            SHOW_ARTIST_PANEL: 2,
            HIDE_CURRENT_PANEL: 3,
            SHOW_CURRENT_PANEL: 4
        };
    }

    constructor(tidalApi) {
        super();
        this.tidalApi = tidalApi;
        this.screen = blessed.screen({
            smartCSR: true,
        });

        this.getScreenPixelRatio().then((pixelRatio) => {
            this.pixelRatio = pixelRatio;

            this.communicationEvents = new Observable();

            this.slavesOptions = {
                screen: this.screen,
                tidalApi: this.tidalApi,
                communicationEvents: this.communicationEvents,
                pixelRatio: this.pixelRatio
            };

            this.prepareKeybindings();
            this.startModules();
            this.startActivityPanel();
            this.startPlayerPanel();
            this.prepareCommunicationWithModules();

            this.screen.render();
        });

    }

    startModules() {
        this.searchModule = new SearchModule(this.slavesOptions);
    }

    prepareKeybindings() {
        this.screen.key(["escape", "q", "C-c"], () => {
            this.playerPanel.player.stop();
            return process.exit(0);
        });

        this.screen.key([":"], () => {
            this.searchModule.run();
        });
    }

    startActivityPanel() {
        this.activityPanel = new ActivityPanel(this.slavesOptions);
        this.screen.append(this.activityPanel);
        this.activityPanel.show();
    }

    startPlayerPanel() {
        this.playerPanel = new PlayerPanel(this.slavesOptions);
        this.screen.append(this.playerPanel);
        this.playerPanel.show();
    }

    prepareCommunicationWithModules() {
        this.communicationEvents.subscribe(async (event) => {
            switch (event.type) {
                case MainScreen.eventTypes.PLAY_TRACK:
                    await this.playTrack(event.track);
                    break;

                case MainScreen.eventTypes.ADD_TRACK_TO_QUEUE:
                    await this.addTrackToQueue(event.track);
                    break;

                case MainScreen.eventTypes.SHOW_ARTIST_PANEL:
                    this.activityPanel.show();
                    this.activityPanel.focus();
                    let artist = event.artist;
                    await artist.updateArt(this.tidalApi);
                    await artist.updateTracks(this.tidalApi);
                    this.activityPanel.showPanel(ActivityPanel.panels.ARTIST_PANEL, {artist});
                    this.screen.render();
                    break;

                case MainScreen.eventTypes.HIDE_CURRENT_PANEL:
                    this.activityPanel.hideCurrentPanel();
                    this.screen.render();
                    break;

                case MainScreen.eventTypes.SHOW_CURRENT_PANEL:
                    this.activityPanel.show();
                    this.activityPanel.focus();
                    this.activityPanel.showCurrentPanel();
                    this.screen.render();
                    break;
            }
        });
    }

    async addTrackToQueue(track) {
        await track.updateStreamURL(this.tidalApi);
        this.playerPanel.player.addTrackToQueue(track);
    }

    async playTrack(track) {
        await track.updateStreamURL(this.tidalApi);
        this.playerPanel.player.play(track);
    }

    getScreenPixelRatio() {
        return new Promise((resolve) => {
            blessed.image({
                parent: this.screen,
                type: "overlay"
            }).getPixelRatio((error, ratio) => {
                resolve(ratio);
            });
        });
    }

};
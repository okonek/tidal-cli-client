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
            SHOW_ARTIST_PANEL: 1
        };
    }

    constructor(options) {
        super();
        this.options = options;
        this.communicationEvents = new Observable();
        this.screen = blessed.screen({
            smartCSR: true,
        });

        this.screen.key(["escape", "q", "C-c"], () => {
            return process.exit(0);
        });

        this.communicationEvents.subscribe(async (event) => {
            switch (event.type) {
                case MainScreen.eventTypes.PLAY_TRACK:
                    await this.playTrack(event.track);
                    break;

                case MainScreen.eventTypes.SHOW_ARTIST_PANEL:
                    this.searchModule.hide();
                    this.activityPanel.show();
                    this.screen.render();
                    this.activityPanel.showArtistPanel(event.artist);
                    break;
            }
        });


        this.playerPanel = new PlayerPanel(this.screen);
        this.screen.append(this.playerPanel);
        this.playerPanel.show();

        this.searchModule = new SearchModule(this.screen, this.options.tidalApi, this.communicationEvents);

        this.screen.key([":"], () => {
            this.searchModule.run();
        });

        this.activityPanel = new ActivityPanel(this.screen);
        this.screen.append(this.activityPanel);
        this.activityPanel.show();
        this.activityPanel.showArtistPanel("");
        this.screen.render();
    }

    async playTrack(track) {
        await track.updateStreamURL(this.options.tidalApi);
        this.playerPanel.player.play(track);
    }



};
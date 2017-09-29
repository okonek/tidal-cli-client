const NavigationItem = require("../NavigationItem");
const blessed = require("blessed");
const TracksList = require("./TracksList");
const TidalApi = require("../TidalApi");
const Track = require("../Track");
const PlayerPanel = require("./PlayerPanel");

module.exports = class extends NavigationItem {

    constructor(options) {
        super();
        this.options = options;
        this.screen = blessed.screen({
            smartCSR: true,
        });

        this.screen.key(["escape", "q", "C-c"], () => {
            return process.exit(0);
        });


        this.trackNameSearch = new blessed.Textbox({
            parent: this.screen
        });
        this.screen.append(this.trackNameSearch);
        this.screen.key([":"], () => {
            this.searchForTracks();
        });


        this.playerPanel = new PlayerPanel(this.screen, this.options.player);
        this.screen.append(this.playerPanel);
        this.playerPanel.show();
    }

    searchForTracks() {
        this.trackNameSearch.show();
        this.screen.render();

        this.trackNameSearch.readInput(async (error, value) => {

            let tracks = await this.options.tidalApi.searchFor(value, TidalApi.searchTypes.TRACKS);
            tracks = tracks.map(trackObject => new Track(trackObject));

            let tracksList = this.showTracksList(tracks);
            tracksList.on("select", async (item, index) => {
                await this.playTrack(tracks[index]);
                this.screen.remove(tracksList);
                this.screen.render();
            });

            this.trackNameSearch.hide();
            this.screen.render();
        });
    }

    async playTrack(track) {
        await track.updateStreamURL(this.options.tidalApi);
        this.options.player.play(track);
    }

    showTracksList(tracks) {
        let tracksList = new TracksList({
            parent: this.screen,
            height: "80%"
        }, tracks);
        this.screen.append(tracksList);

        tracksList.focus();
        tracksList.show();

        return tracksList;
    }

};
const blessed = require("blessed");
const SearchBox = require("./SearchBox");
const TidalApi = require("../TidalApi");
const List = require("./List");
const Track = require("../Track");

module.exports = class SearchPanel extends blessed.box {
    constructor(options) {
        super(SearchPanel.getBoxOptions(options.parent));
        this.options = options;
        this.run();
    }

    run() {
        let searchForItems = new SearchBox();
        this.append(searchForItems);


        searchForItems.ask("Which track?").then(async (trackName) => {

            let tracks = await this.options.tidalApi.searchFor(trackName, TidalApi.searchTypes.TRACKS);

            let tracksList = new List(SearchPanel.getTracksListOptions(this.options.parent), tracks.map(track => track.title));
            this.options.parent.append(tracksList);
            tracksList.select(0);


            tracksList.on("select", async (trackTitle, index) => {
                let selectedTrack = new Track(tracks[index]);
                await selectedTrack.updateStreamURL(this.options.tidalApi);
                this.options.player.play(selectedTrack);
                this.options.parent.remove(tracksList);
                this.options.parent.render();
                this.run();
            });

            tracksList.focus();
        });
    }

    static getBoxOptions(parent) {
        return {
            parent: parent,
            height: "80%",
            border: {
                type: "line"
            },
            style: {
                border: {
                    fg: "#999999"
                }
            },
        };
    }

    static getTracksListOptions(parent) {
        return {
            parent: parent,
            height: "80%",
            border: {
                type: "line"
            },
            style: {
                border: {
                    fg: "#FFFFFF"
                },
                selected: {
                    bg: "green"
                },
            },
            padding: 1
        };
    }
};
const InfoPanelTemplate = require("./InfoPanelTemplate");
const AlbumsList = require("./AlbumsList");
const TracksList = require("./TracksList");

module.exports = class extends InfoPanelTemplate {
    constructor(options) {
        super(options, options.artist.name, options.artist.artSrc, options.artist.tracks);

        this.albumsList = new AlbumsList({
            parent: this,
            width: "30%",
            height: "100%",
            left: "20%",
            communicationEvents: this.communicationEvents
        }, this.options.artist.albums);

        this.albumsList.focus();

        this.tracksList.hide();
        this.options.screen.render();

        this.tracksList = new TracksList({
            parent: this,
            width: "30%",
            height: "100%",
            left: "50%",
            communicationEvents: this.communicationEvents
        }, this.options.artist.tracks);

        this.focusableItems = [this.albumsList, this.tracksList];
        this.currentFocusedItem = this.albumsList;

        this.setupFocusingSystem();
    }

};
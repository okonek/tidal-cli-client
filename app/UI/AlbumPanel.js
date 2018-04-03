const InfoPlaybackPanelTemplate = require("./InfoPlaybackPanelTemplate");

module.exports = class extends InfoPlaybackPanelTemplate {
    constructor(options) {
        super(options, options.album.title, options.album.coverArtSrc, options.album.tracks);

        this.focusableItems = [this.playButton, this.tracksList];
        this.currentFocusedItem = this.tracksList;

        this.setupFocusingSystem();
    }
};
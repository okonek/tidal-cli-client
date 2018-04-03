const InfoPlaybackPanelTemplate = require("./InfoPlaybackPanelTemplate");

module.exports = class extends InfoPlaybackPanelTemplate {
    constructor(options) {
        super(options, options.playlist.name, options.playlist.artSrc, options.playlist.tracks);

        this.focusableItems = [this.playButton, this.tracksList];
        this.currentFocusedItem = this.tracksList;

        this.setupFocusingSystem();

    }
};
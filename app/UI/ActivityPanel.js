const blessed = require("blessed");
const ArtistPanel = require("./ArtistPanel");

module.exports = class extends blessed.box {
    constructor(options) {
        super({
            parent: options.screen,
            height: "80%",
        });
        this.options = options;
    }

    showArtistPanel(artist) {
        this.currentPanel = new ArtistPanel(this.options, artist);
        this.append(this.currentPanel);
        this.currentPanel.show();
        this.screen.render();
    }
};
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
        if(this.currentPanel) {
            this.currentPanel.hide();
            this.options.screen.render();
        }
        this.currentPanel = new ArtistPanel(this.options, artist);
        this.append(this.currentPanel);
        this.currentPanel.show();
        this.options.screen.render();
    }
};
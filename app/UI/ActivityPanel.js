const blessed = require("blessed");
const ArtistPanel = require("./ArtistPanel");

module.exports = class extends blessed.box {
    constructor(screen) {
        super({
            parent: screen,
            height: "80%",
        });
    }

    showArtistPanel(artist) {
        this.currentPanel = new ArtistPanel(this, artist);
        this.append(this.currentPanel);
        this.currentPanel.show();
    }
};
const blessed = require("blessed");
const ArtistPanel = require("./ArtistPanel");


module.exports = class ActivityPanel extends blessed.box {
    constructor(options) {
        super({
            parent: options.screen,
            height: "80%",
        });
        options.parent = this;
        this.options = options;

    }

    static get panels() {
        return {
            ARTIST_PANEL: 0
        };
    }

    showPanel(panelIndex, panelOptions) {
        if(this.currentPanel) {
            this.currentPanel.hide();
            this.options.screen.render();
        }

        this.currentPanelOptions = Object.assign({}, this.options, panelOptions);
        this.currentPanelIndex = panelIndex;

        switch (panelIndex) {
            case ActivityPanel.panels.ARTIST_PANEL:
                this.currentPanel = new ArtistPanel(this.currentPanelOptions);
                break;
        }

        this.append(this.currentPanel);
        this.currentPanel.show();
    }

    hideCurrentPanel() {
        if(this.currentPanel) {
            this.currentPanel.hide();
            this.currentPanel.hideImages();
        }
    }

    showCurrentPanel() {
        if(this.currentPanel) {
            this.showPanel(this.currentPanelIndex, this.currentPanelOptions);
        }
    }

};
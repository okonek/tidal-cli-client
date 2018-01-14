const blessed = require("blessed");
const ArtistPanel = require("./ArtistPanel");
const StartPanel = require("./StartPanel");

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
            ARTIST_PANEL: 0,
            START_PANEL: 1
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

            case ActivityPanel.panels.START_PANEL:
                this.currentPanel = new StartPanel(this.currentPanelOptions);
                break;
        }
    }

    hideCurrentPanel() {
        if(this.currentPanel) {
            this.currentPanel.hide();
            if(this.currentPanelIndex === ActivityPanel.panels.ARTIST_PANEL) {
                this.currentPanel.hideImages();
            }
        }
    }

    showCurrentPanel() {
        if(this.currentPanel) {
            this.showPanel(this.currentPanelIndex, this.currentPanelOptions);
        }
    }

};
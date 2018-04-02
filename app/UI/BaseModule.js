const blessed = require("blessed");

module.exports = class {
    constructor(options) {
        this.screen = options.screen;
        this.communicationEventTypes = require("./MainScreen").eventTypes;
        this.communicationEvents = options.communicationEvents;
        this.tidalApi = options.tidalApi;

        this.searchBox = new blessed.Textbox({
            parent: this.screen,
            height: "5%",
            top: "80%",
            left: "1%",
            bg: "#535253"
        });
        this.searchBox.hide();
    }

    resetUI() {
        if(this.searchResultsList) {
            this.searchResultsList.hide();
        }
        this.screen.append(this.searchBox);
        this.searchBox.clearValue();
        this.searchBox.show();
        this.searchBox.focus();
        this.screen.render();
    }

};
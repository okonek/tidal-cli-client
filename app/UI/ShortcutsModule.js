const blessed = require("blessed");
const BaseModule = require("./BaseModule");

module.exports = class extends BaseModule {
    constructor(options, slaveModules) {
        super(options);
        this.slaveModules = slaveModules;
        this.searchBox.show();
    }

    run() {
        this.resetUI();

        this.searchBox.readInput(async (error, value) => {
            switch(value) {
                case "search":
                    this.slaveModules.searchModule.run();
                    break;

                case "next":
                    this.communicationEvents.fire({
                        type: this.communicationEventTypes.SKIP_TRACKS,
                        tracksCount: 1
                    });
                    break;

                case "skip":
                    this.slaveModules.skipTracksModule.run();
                    break;
            }

            this.searchBox.hide();
            this.screen.render();
        });
    }



};
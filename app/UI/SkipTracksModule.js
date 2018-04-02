const BaseModule = require("./BaseModule");

module.exports = class extends BaseModule {
    constructor(options) {
        super(options);
    }

    run() {
        this.resetUI();

        this.searchBox.readInput(async (error, value) => {

            value = Number(value);
            if(Number.isInteger(value) && value > 0) {
                this.communicationEvents.fire({
                    type: this.communicationEventTypes.SKIP_TRACKS,
                    tracksCount: value
                });
            }

            this.searchBox.hide();
            this.screen.render();
        });
    }

};

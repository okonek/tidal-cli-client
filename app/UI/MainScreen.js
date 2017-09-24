const NavigationItem = require("../NavigationItem");
const blessed = require("blessed");

module.exports = class extends NavigationItem {

    constructor() {
        super();
        this.screen = blessed.screen({
            smartCSR: true,
        });
        this.screen.key(["escape", "q", "C-c"], () => {
            return process.exit(0);
        });
    }

    addItem(item) {
        this.screen.append(item);
    }

    show(options) {
        this.screen.render();
    }
};
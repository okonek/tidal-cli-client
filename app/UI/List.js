const blessed = require("blessed");

module.exports = class extends blessed.list {
    constructor(options, items) {
        options = Object.assign({}, {
            keys: true,
            mouse: true,
            style: {
                fg: "blue",
                bg: "default",
                selected: {
                    bg: "green"
                }
            },
        }, options);
        options.items = items;
        super(options);
        this.select(0);
    }
};
const blessed = require("blessed");

module.exports = class extends blessed.list {
    constructor(options, tracks) {
        options = Object.assign({}, {
            keys: true,
            style: {
                fg: "blue",
                bg: "default",
                selected: {
                    bg: "green"
                }
            },
        }, options);
        options.items = tracks.map(track => track.title);
        super(options);
        this.select(0);
    }
};
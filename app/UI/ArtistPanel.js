const blessed = require("blessed");

module.exports = class extends blessed.box {
    constructor(screen, artist) {
        super({
            height: "80%",
            parent: screen
        });
        this.setContent("");
    }
};
const blessed = require("blessed");

module.exports = class extends blessed.textbox{
    constructor(settings) {
        super(Object.assign({}, {
            mouse: true,
            keys: true,
            width: "20%",
            height: 1,
            bg: "blue",
        }, settings));

        this.on("focus", () => {
            this.readInput();
        });
    }
};
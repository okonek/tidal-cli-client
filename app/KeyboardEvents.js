const Observable = require("./Observable");

module.exports = class KeyboardEvents extends Observable {
    constructor() {
        super();

        process.stdin.on("keypress", (keyName, key) => {
            //this.fire(key);
        });
    }

    static get keyboardKeys() {
        return {
            SPACE: "space",
            RIGHT: "right",
            LEFT: "left",
            UP: "up",
            DOWN: "down",
            ESCAPE: "escape",
            P: "p",
            S: "s"
        };
    }
};
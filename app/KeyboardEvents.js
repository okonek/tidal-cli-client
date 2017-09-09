const Observable = require("./Observable");
const readline = require("readline");

module.exports = class KeyboardEvents extends Observable{
    constructor() {
        super();

        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on("keypress", (keyName, key) => {
            if(key.ctrl && key.name === "c") {
                process.exit();
            }
            else {
                this.fire(key);
            }
        });
    }

    static keyboardKeys() {
        return {
            SPACE: "space",
            RIGHT: "right",
            LEFT: "left",
            UP: "up",
            DOWN: "down"
        };
    }
}
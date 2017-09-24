const blessed = require("blessed");

module.exports = class extends blessed.prompt {
    constructor(width = "75%") {
        super({
            width,
            height: "shrink",
            keys: true,
            border: {
                type: "line"
            },
            style: {
                border: {
                    fg: "#FFFFFF"
                }
            },
        });
    }

    ask(question) {
        return new Promise((resolve, reject) => {
            this.input(question, "", (error, result) => {
                resolve(result);
            });
        });
    }
};
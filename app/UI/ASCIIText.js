const blessed = require("blessed");
const figlet = require("figlet");

module.exports = class extends blessed.text {
    constructor(options) {
        super(Object.assign({}, options, {
            content: figlet.textSync(options.content)
        }));
    }
};
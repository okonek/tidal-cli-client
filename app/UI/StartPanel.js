const blessed = require("blessed");
const ASCIIText = require("./ASCIIText");

module.exports = class extends blessed.box {
    constructor(options) {
        super({
            parent: options.parent
        });
        this.options = options;

        this.appName = new ASCIIText({
            parent: this,
            content: "Tidal   CLI",
            top: "center",
            left: "center"
        });
        this.append(this.appName);
    }
};
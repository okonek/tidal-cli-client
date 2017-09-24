const blessed = require("blessed");
const SearchBox = require("./SearchBox");

module.exports = class extends blessed.box {
    constructor(parent) {
        super({
            parent,
            height: "80%",
            border: {
                type: "line"
            },
            style: {
                border: {
                    fg: "#FFFFFF"
                }
            },
        });
        let searchForItems = new SearchBox();
        this.append(searchForItems);

        searchForItems.ask("Which track?").then((trackName) => {
            console.log(trackName);
        });
    }
};
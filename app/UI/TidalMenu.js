const List = require("./List");

module.exports = class TidalMenu extends List{
    constructor() {
        let message = "What do you want from me?";
        let optionsToSelect = [
            {
                name: "Search for artists",
                value: TidalMenu.menuOptions.ARTISTS_SEARCH
            },
            {
                name: "Search for tracks",
                value: TidalMenu.menuOptions.TRACKS_SEARCH
            }
        ];
        super(message, optionsToSelect);


    }

    static get menuOptions() {
        return {
            ARTISTS_SEARCH: 0,
            TRACKS_SEARCH: 1
        };
    }
}
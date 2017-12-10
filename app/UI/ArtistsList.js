const List = require("./List");

module.exports = class extends List {
    constructor(options, artists) {
        artists = artists.map(artist => artist.name);
        super(options, artists);
    }
};
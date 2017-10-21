const List = require("./List");

module.exports = class extends List {
    constructor(options, tracks) {
        tracks = tracks.map(track => track.title);
        super(options, tracks);
    }
};
const List = require("./List");

module.exports = class extends List {
    constructor(options, tracks) {
        tracks = tracks.map(track => {
                let trackLabel = track.title + " - ";
                track.artists.forEach((artist) => {
                    trackLabel += artist.name + " ";
                });
                return trackLabel;
            }
        );
        super(options, tracks);
    }
};
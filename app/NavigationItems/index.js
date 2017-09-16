const artistsList = require("./ArtistsList");
const menu = require("./Menu");
const playTrack = require("./PlayTrack");
const searchForArtists = require("./SearchForArtists");
const searchForTracks = require("./SearchForTracks");
const tracksList = require("./TracksList");

exports.getItems = (tidalApi, player) => {
    let navigationItems = {
        artistsList,
        searchForArtists,
        tracksList,
        searchForTracks,
        playTrack,
        menu
    };
    Object.keys(navigationItems).map((key) => {
        navigationItems[key] = navigationItems[key].getItem(tidalApi, player);
    });
    return navigationItems;
};


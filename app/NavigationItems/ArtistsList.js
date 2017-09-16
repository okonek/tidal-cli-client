const NavigationItem = require("../NavigationItem");
const TidalList = require("../UI/TidalList");
const TidalApi = require("../TidalApi");

exports.getItem = (tidalApi) => new NavigationItem(async (navigation, options) => {
    let artistsList = new TidalList("Gimme music", options.artists, TidalApi.searchTypes.ARTISTS);
    navigation.subscribe(() => {
        artistsList.close();
    }, {
        type: "kill",
        item: "artistsList"
    });
    let selectedArtist = await artistsList.show();
    await selectedArtist.updateTracks(tidalApi);
    navigation.show("tracksList", {
        tracks: selectedArtist.tracks
    });
});
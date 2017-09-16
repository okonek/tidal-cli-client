const NavigationItem = require("../NavigationItem");
const TidalList = require("../UI/TidalList");
const TidalApi = require("../TidalApi");

exports.getItem = () => new NavigationItem(async (navigation, options) => {
    let tracksList = new TidalList("Gimme music", options.tracks, TidalApi.searchTypes.TRACKS);
    navigation.subscribe(() => {
        tracksList.close();
    }, {
        type: "kill",
        item: "tracksList"
    });
    let selectedObject = await tracksList.show();
    navigation.show("playTrack", {
        track: selectedObject
    });
});
const NavigationItem = require("../NavigationItem");
const TidalList = require("../UI/TidalList");
const TidalApi = require("../TidalApi");
const Search = require("../Search");

exports.getItem = (tidalApi) => new NavigationItem(async (navigation) => {
    let searchForTracks = new Search(tidalApi, TidalApi.searchTypes.TRACKS);

    navigation.subscribe(() => {
        searchForTracks.close();
    }, {
        type: "kill",
        item: "searchForTracks"
    });
    
    let tracks = await searchForTracks.ask();
    navigation.show("tracksList", {
        tracks
    });
});
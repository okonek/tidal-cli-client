const NavigationItem = require("../NavigationItem");
const TidalApi = require("../TidalApi");
const Search = require("../Search");

exports.getItem = (tidalApi) => new NavigationItem(async (navigation) => {
    let searchForArtists = new Search(tidalApi, TidalApi.searchTypes.ARTISTS);
    navigation.subscribe(() => {
        searchForArtists.close();
    }, {
        type: "kill",
        item: "searchForArtists"
    });
    let artists = await searchForArtists.ask();
    navigation.show("artistsList", {
        artists
    });
});
const TidalMenu = require("../UI/TidalMenu");
const NavigationItem = require("../NavigationItem");

exports.getItem = () => new NavigationItem(async (navigation) => {
    let menu = new TidalMenu();
    let selectedOption = await menu.show();

    switch(selectedOption) {
        case TidalMenu.menuOptions.ARTISTS_SEARCH:
            navigation.show("searchForArtists");
            break;

        case TidalMenu.menuOptions.TRACKS_SEARCH:
            navigation.show("searchForTracks");
            break;
    }
    
});
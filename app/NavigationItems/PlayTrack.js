const NavigationItem = require("../NavigationItem");

exports.getItem = (tidalApi, player) => new NavigationItem(async (navigation, options) => {
    let trackToPlay = options.track;
    await trackToPlay.updateStreamURL(tidalApi);
    player.play(trackToPlay);
});
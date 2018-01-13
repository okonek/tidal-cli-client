const TidalApi = require("./TidalApi");
let MainScreen = require("./UI/MainScreen");

module.exports = function () {
    const config = require("/etc/tidalConfig.js");

    const tidalApi = new TidalApi(config);
    let mainScreen = new MainScreen(tidalApi);
};
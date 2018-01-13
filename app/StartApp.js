const TidalApi = require("./TidalApi");
let MainScreen = require("./UI/MainScreen");

module.exports = function () {
    const config = require("../config");

    const tidalApi = new TidalApi(config);
    let mainScreen = new MainScreen(tidalApi);
};
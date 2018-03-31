const TidalApi = require("./TidalApi");
let MainScreen = require("./UI/MainScreen");

module.exports = function () {
    const config = require(process.env.HOME + "/.tidalConfig.js");

    const tidalApi = new TidalApi(config);

    tidalApi.tryLogin(tidalApi.authData, () => {
        let mainScreen = new MainScreen(tidalApi);
    });
};
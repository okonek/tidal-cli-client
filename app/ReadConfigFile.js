const config = require(process.env.HOME + "/.tidalConfig.js");
const W3M_IMG_PATHS = ["/usr/lib/w3m/w3mimgdisplay", "/usr/libexec/w3m/w3mimgdisplay"];
const MPV_PATHS = ["mpv"];

const throwBadConfigError = () => {
    console.error("You have a bad config file. " +
        "You can edit it or remove it to login once again and to create a correct config." +
        " Its in your home directory named .tidalConfig.js (~/.tidalConfig.js)");
    process.exit(1);
};

const checkForPropertiesInObject = (object, properties) => {
    for(let index in properties) {
        if(properties.hasOwnProperty(index)) {
            let property = properties[index];

            if (!object[property]){
                return false;
            }
        }
    }
    return true;
};

const evaluateConfig = () => {
    if(!checkForPropertiesInObject(config, ["tidalConfig", "paths"])) throwBadConfigError();
    if(!checkForPropertiesInObject(config.tidalConfig, ["username", "password", "quality", "token"])) throwBadConfigError();
    if(!checkForPropertiesInObject(config.paths, ["w3mImg", "mpv"])) throwBadConfigError();

};

module.exports.getTidalConfig = () => {
    evaluateConfig();
    return config.tidalConfig ? config.tidalConfig : throwBadConfigError();
};

module.exports.getW3mImgPaths = () => {
    evaluateConfig();
    return config.paths.w3mImg ? config.paths.w3mImg : W3M_IMG_PATHS;
};

module.exports.getMpvPaths = () => {
    evaluateConfig();
    return config.paths.mpv ? config.paths.mpv : MPV_PATHS;
};


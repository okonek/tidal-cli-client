const fs = require("fs");

const TOKEN = "BI218mwp9ERZ3PFI";
const W3M_IMG_PATHS = ["/usr/lib/w3m/w3mimgdisplay", "/usr/libexec/w3m/w3mimgdisplay"];
const MPV_PATHS = ["mpv"];

module.exports = function (username, password, quality) {
    const CONFIG = {
        tidalConfig: {
            username: username,
            password: password,
            quality: quality,
            token: TOKEN
        },
        paths: {
            w3mImg: W3M_IMG_PATHS,
            mpv: MPV_PATHS
        }
    };
    const CONFIG_FILE = `module.exports=${JSON.stringify(CONFIG)};`;
    fs.writeFileSync(process.env.HOME + "/.tidalConfig.js", CONFIG_FILE);
};
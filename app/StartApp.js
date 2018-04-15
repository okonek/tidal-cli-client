const TidalApi = require("./TidalApi");
let MainScreen = require("./UI/MainScreen");
const commandExists = require("command-exists");
let ReadConfigFile;

const commandExistsMultiplePaths = (paths) => {
    return new Promise(async (resolve, reject) => {
        let exists = false;

        for(let index in paths) {

            if(paths.hasOwnProperty(index)) {
                let path = paths[index];

                await commandExists(path).then(x => exists = true, () => {});
            }
        }

        exists ? resolve() : reject();
    });
};

const checkDependencies = async () => {
    let hasMpv, hasW3mImg;

    await commandExistsMultiplePaths(ReadConfigFile.getMpvPaths()).then(result => hasMpv = true, () => hasMpv = false);
    await commandExistsMultiplePaths(ReadConfigFile.getW3mImgPaths()).then(result => hasW3mImg = true, () => hasW3mImg = false);

    if(!hasMpv) {
        console.log("You haven't got MPV installed");
    }

    if(!hasW3mImg) {
        console.log("You haven't got W3M-IMG installed");
    }

    if(!hasMpv || !hasW3mImg) {
        process.exit(1);
    }
};

const tryLogin = (tidalApi) => {
    return new Promise((resolve) => {
        tidalApi.tryLogin(tidalApi.authData, () => {
            resolve(new MainScreen(tidalApi));
        });
    });
};

module.exports = async function () {
    ReadConfigFile = require("./ReadConfigFile");

    await checkDependencies();

    const tidalApi = new TidalApi(ReadConfigFile.getTidalConfig());

    return await tryLogin(tidalApi);
};
const fs = require("fs");

const TOKEN = "BI218mwp9ERZ3PFI";

module.exports = function (username, password, quality) {
    const CONFIG_FILE = `module.exports={username:"${username}",password:"${password}",quality:"${quality}",token:"${TOKEN}"};`;
    fs.writeFileSync(process.env.HOME + "/.tidalConfig.js", CONFIG_FILE);
};
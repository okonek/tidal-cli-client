const fs = require("fs");

const TOKEN = "wdgaB1CilGA-S_s2";

module.exports = function (username, password, quality = "HIGH") {
    const CONFIG_FILE = `module.exports={username:"${username}",password:"${password}",quality:"${quality}",token:"${TOKEN}"};`;
    fs.writeFileSync("/etc/tidalConfig.js", CONFIG_FILE);
};
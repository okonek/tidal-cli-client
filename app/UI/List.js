const inquirer = require("inquirer");
const TidalApi = require("../TidalApi");

module.exports = class List {

    constructor(message, objects) {
        this.message = message;
        this.objects = objects;
    }

    show() {
        return new Promise((resolve, reject) => {
            inquirer.prompt({
                type: "list",
                name: "selection",
                message: this.message,
                choices: this.objects,
            }).then((result) => {
                process.stdin.resume();
                process.stdin.setRawMode(true);
                resolve(result["selection"]);
            });
        });
    }
}
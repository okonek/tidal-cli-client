const inquirer = require("inquirer");
const TidalApi = require("../TidalApi");

module.exports = class List {

    constructor(message, objects) {
        this.message = message;
        this.objects = objects;
    }

    show() {
        this.prompt = inquirer.prompt({
            type: "list",
            name: "selection",
            message: this.message,
            choices: this.objects,
        });
        return new Promise((resolve, reject) => {
            this.prompt.then((result) => {
                process.stdin.resume();
                process.stdin.setRawMode(true);
                resolve(result["selection"]);
            });
        });
    }

    close() {
        this.prompt.ui.close();
    }
}
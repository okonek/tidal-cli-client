const inquirer = require("inquirer");
const TidalApi = require("../TidalApi");

module.exports = class List {

    constructor(message, objects, type) {
        this.message = message;
        let nameIndex;

        switch(type) {
            case TidalApi.searchTypes().TRACKS:
                nameIndex = "title";
                break;

            case TidalApi.searchTypes().ARTISTS:
                nameIndex = "name";
                break;
        }

        this.objects = objects.map(object => {
            return {
                name: object[nameIndex],
                value: object
            }
        });
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
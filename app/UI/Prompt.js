const inquirer = require("inquirer");

module.exports = class Prompt {
    constructor(message, resultName) {
        this.message = message;
        this.resultName = resultName;
    }

    show() {
        return inquirer.prompt({
            type: "input",
            name: this.resultName,
            message: this.message,
        });
    }
}
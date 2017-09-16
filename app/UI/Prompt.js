const inquirer = require("inquirer");

module.exports = class Prompt {
    constructor(message, resultName) {
        this.message = message;
        this.resultName = resultName;
        this.prompt;
    }

    show() {
        this.prompt = inquirer.prompt({
            type: "input",
            name: this.resultName,
            message: this.message,
        });
        return this.prompt;
    }

    close() {
        this.prompt.ui.close();
    }
}
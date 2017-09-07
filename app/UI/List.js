const inquirer = require("inquirer");

module.exports = class List{
    constructor(message, resultName, choices) {
        this.message = message;
        this.resultName = resultName;
        this.choices = choices;
    }

    show() {
        return inquirer.prompt([{
            type: "list",
            name: this.resultName,
            message: this.message,
            choices: this.choices,

        }], "Gimme music");
    }
}
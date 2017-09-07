const inquirer = require("inquirer");

module.exports = class TracksList{
    constructor(message, resultName, tracks) {
        this.message = message;
        this.resultName = resultName;
        this.tracks = tracks.map(track => {
            return {
                name: track.title,
                value: track.id
            }
        });
    }

    show() {
        return inquirer.prompt([{
            type: "list",
            name: this.resultName,
            message: this.message,
            choices: this.tracks,

        }], "Gimme music");
    }
}
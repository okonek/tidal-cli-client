const inquirer = require("inquirer");

module.exports = class TracksList{
    constructor(message, tracks) {
        this.message = message;
        this.resultName = "id";
        this.tracks = tracks.map(track => {
            return {
                name: track.title,
                value: track.id
            }
        });
    }

    show() {
        return new Promise((resolve, reject) => {
            inquirer.prompt({
                type: "list",
                name: this.resultName,
                message: this.message,
                choices: this.tracks,
            }).then((result) => {
                process.stdin.resume();
                process.stdin.setRawMode(true);
                resolve(result[this.resultName]);
            });
        });
    }
}
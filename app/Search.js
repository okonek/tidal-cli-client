const Prompt = require("./UI/Prompt");

module.exports = class Search {
    constructor(tidalApi, type) {
        let promptInfo = "";

        switch(type) {
            case Search.searchTypes().ARTIST:
                promptInfo = "Which artist do you wantt???";
                break;

            case Search.searchTypes().TRACK:
                promptInfo = "Maybe SOYCD??";
                break;
        }
        this.tidalApi = tidalApi;
        this.prompt = new Prompt(promptInfo, "searchInput");
    }

    static searchTypes() {
        return {
            ARTIST: 0,
            TRACK: 1
        }
    }

    ask() {
        return new Promise((resolve, reject) => {
            this.prompt.show().then(async (result) => {
                let value = result.searchInput;
                let tracks = await this.tidalApi.searchForTrack(value);
                process.stdin.resume();
                process.stdin.setRawMode(true);
                resolve(tracks);
            });
        });
    }    
}
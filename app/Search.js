const Prompt = require("./UI/Prompt");
const TidalApi = require("./TidalApi");

module.exports = class Search {
    constructor(tidalApi, type) {
        let promptInfo = "";

        switch(type) {
            case TidalApi.searchTypes().ARTISTS:
                promptInfo = "Which artist do you wantt???";
                break;

            case TidalApi.searchTypes().TRACKS:
                promptInfo = "Maybe SOYCD??";
                break;
        }
        this.tidalApi = tidalApi;
        this.type = type;
        this.prompt = new Prompt(promptInfo, "searchInput");
    }

    ask() {
        return new Promise((resolve, reject) => {
            this.prompt.show().then(async (search) => {
                let value = search.searchInput;
                let searchedList = await this.tidalApi.searchFor(value, this.type);
                
                process.stdin.resume();
                process.stdin.setRawMode(true);
                resolve(searchedList);
            });
        });
    }    
}
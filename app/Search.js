const Prompt = require("./UI/Prompt");
const TidalApi = require("./TidalApi");

module.exports = class Search extends Prompt{
    constructor(tidalApi, type) {
        let promptQuestion = Search.getPromptQuestion(type);

        super(promptQuestion, "searchInput");
        this.tidalApi = tidalApi;
        this.type = type;
    }

    static getPromptQuestion(type) {
        switch(type) {
            case TidalApi.searchTypes.ARTISTS:
                return "Which artist do you wantt???";

            case TidalApi.searchTypes.TRACKS:
                return "Maybe SOYCD??";
        }
        throw new Error("Bad search type specified");
    }

    ask() {
        return new Promise((resolve, reject) => {
            this.show().then(async (search) => {
                let value = search.searchInput;
                let searchedList = await this.tidalApi.searchFor(value, this.type);
                
                process.stdin.resume();
                process.stdin.setRawMode(true);
                resolve(searchedList);
            });
        });
    }
}
const blessed = require("blessed");

module.exports = class extends blessed.image {
    constructor(options) {
        let width;
        let height;

        if(options.width) {
            width = (options.pixelRatio.tw * options.screen.width * options.width) / options.pixelRatio.tw;
            height = (options.pixelRatio.tw * options.screen.width * options.width) / options.pixelRatio.th;
        }
        else if(options.height) {
            width = (options.pixelRatio.th * options.screen.height * options.height) / options.pixelRatio.tw;
            height = (options.pixelRatio.th * options.screen.height * options.height) / options.pixelRatio.th;
        }

        super(Object.assign({}, options, {
            type: "overlay",
            width,
            height,
            search: false
        }));
    }
};
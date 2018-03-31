const InfoPanelTemplate = require("./InfoPanelTemplate");

module.exports = class extends InfoPanelTemplate {
    constructor(options) {
        super(options, options.playlist.name, options.playlist.artSrc, options.playlist.tracks);
    }
};
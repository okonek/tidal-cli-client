const blessed = require("blessed");
const sharp = require("sharp");

module.exports = class extends blessed.box {
    constructor(options, artist) {
        super({
            height: "80%",
            parent: options.screen
        });

        this.setContent(artist.name);

        let artistImage = blessed.image({
            parent: options.screen,
            type: 'overlay',
            left: "center",
            right: "center",
            width: (options.pixelRatio.tw * options.screen.width / 5) / options.pixelRatio.tw,
            height: (options.pixelRatio.tw * options.screen.width / 5) / options.pixelRatio.th,
            file: artist.artSrc,
            search: false
        });
        options.screen.append(artistImage);
        artistImage.show();
        options.screen.render();


    }
};
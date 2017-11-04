const blessed = require("blessed");
const figlet = require("figlet");

module.exports = class extends blessed.box {
    constructor(options, artist) {
        super({
            height: "80%",
            parent: options.screen
        });

        this.artistNameBox = blessed.text({
            parent: options.screen,
            content: figlet.textSync(artist.name),
            left: 0,
        });
        options.screen.append(this.artistNameBox);

        this.artistImage = blessed.image({
            parent: options.screen,
            type: 'overlay',
            right: 0,
            width: (options.pixelRatio.tw * options.screen.width / 5) / options.pixelRatio.tw,
            height: (options.pixelRatio.tw * options.screen.width / 5) / options.pixelRatio.th,
            file: artist.artSrc,
            search: false
        });
        options.screen.append(this.artistImage);
        this.artistImage.show();
        options.screen.render();
    }

    hide() {
        this.artistNameBox.hide();
        this.artistImage.hide();
    }
};
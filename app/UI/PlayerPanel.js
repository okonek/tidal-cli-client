const blessed = require("blessed");

module.exports = class extends blessed.box {
    constructor() {
        super({
            width: "100%",
            height: "20%",
            border: {
                type: "line"
            },
            style: {
                border: {
                    fg: "#FFFFFF"
                }
            },
            bottom: 0,
        });
        this.track = null;

        let trackTitleBox = new blessed.text({
            content: this.track ? this.track.title : "No track"
        });
        this.append(trackTitleBox);
    }
};
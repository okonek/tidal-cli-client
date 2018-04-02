const InfoPanelTemplate = require("./InfoPanelTemplate");
const blessed = require("blessed");

module.exports = class extends InfoPanelTemplate {
    constructor(options, textContent, imageSrc, tracks) {
        super(options, textContent, imageSrc, tracks);

        this.playButton = blessed.button({
            parent: this.additionalContentBox,
            content: "Play",
            mouse: true,
            keys: true,
            shrink: true,
            name: "submit",
            style: {
                bg: "blue",
                focus: {
                    bg: "red"
                },
                hover: {
                    bg: "red"
                }
            }
        });

        this.playButton.on("press", () => {
            this.communicationEvents.fire({
                type: this.communicationEventTypes.PLAY_TRACKS,
                tracks: [...tracks]
            });
            this.tracksList.focus();
        });

        this.playButton.key("right", () => {
            this.tracksList.focus();
        });

        this.tracksList.key("left", () => {
            this.playButton.focus();
        });
    }
};
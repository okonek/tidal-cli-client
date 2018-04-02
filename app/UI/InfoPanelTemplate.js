const blessed = require("blessed");
const Image = require("./Image");
const TracksList = require("./TracksList");
const imageSize = require("image-size");

module.exports = class extends blessed.box {
    constructor(options, textContent, imageSrc = __dirname + "/../static/defaultArtistImage.jpg", tracks) {
        super({
            parent: options.parent,
        });
        this.options = options;

        this.textContent = textContent;
        this.imageSrc = imageSrc;
        this.tracks = tracks;
        this.imageDimensions = imageSize(this.imageSrc);
        this.imageProportions = this.imageDimensions.width / this.imageDimensions.height;

        this.communicationEventTypes = require("./MainScreen").eventTypes;
        this.communicationEvents = options.communicationEvents;

        this.nameBox = new blessed.text({
            parent: this,
            content: this.textContent,
            width: "40%",
            height: 1,
            left: 0,
        });
        this.append(this.nameBox);

        this.image = new Image(
            Object.assign({}, options, {
                parent: this,
                width: 0.2,
                file: this.imageSrc,
                proportions: this.imageProportions,
                right: 0
            })
        );

        this.additionalContentBox = new blessed.box({
            parent: this,
            width: "40%",
            left: 0,
            top: 2,
        });

        this.showTracksList();
    }

    hideImages() {
        this.image.hide();
    }

    showImages() {
        this.image.show();
    }

    showTracksList() {
        this.tracksList = new TracksList({
            parent: this,
            width: "40%",
            height: "100%",
            left: "40%",
            communicationEvents: this.communicationEvents
        }, this.tracks);

        this.tracksList.focus();
    }

};
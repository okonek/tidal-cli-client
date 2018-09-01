const blessed = require("blessed");
const BaseElement = require("../../abstract/BaseElement");
const imageSize = require("image-size");

module.exports = class extends BaseElement {
	constructor(parent, options, imageSrc = undefined) {
		super(parent);

		this.options = options;
		this.updateElement(imageSrc);
	}

	updateElement(imageSrc) {
		if(!imageSrc) {
			return;
		}

		this.imageSrc = imageSrc;

		let width;
		let height;

		let imageDiemensions = imageSize(this.imageSrc);
		let proportions = imageDiemensions.width / imageDiemensions.height;

		let masterParent = this.getMasterParent();

		if(this.options.width) {
			width = (this.options.pixelRatio.tw * masterParent.width * this.options.width) / this.options.pixelRatio.tw;
			height = (this.options.pixelRatio.tw * masterParent.width * this.options.width) / this.options.pixelRatio.th / proportions;
		}
		else if(this.options.height) {
			width = (this.options.pixelRatio.th * masterParent.height * this.options.height) / this.options.pixelRatio.tw;
			height = (this.options.pixelRatio.th * masterParent.height * this.options.height) / this.options.pixelRatio.th / proportions;
		}


		this.element = blessed.image(Object.assign({}, this.options, {
			type: "overlay",
			width,
			height,
			file: this.imageSrc,
			search: true
		}));
	}
};
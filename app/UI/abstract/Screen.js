const blessed = require("blessed");
const BaseElement = require("./BaseElement");

module.exports = class extends BaseElement {
	constructor() {
		super();
		this.element = blessed.screen({
			smartCSR: true,
			grabKeys: false,
		});
	}

	getScreenPixelRatio() {
		return new Promise((resolve, reject) => {
			blessed.image({
				parent: this.screen,
				type: "overlay"
			}).getPixelRatio((error, ratio) => {
				if(error) {
					reject(error);
				}
				else {
					resolve(ratio);
				}
			});
		});
	}

};
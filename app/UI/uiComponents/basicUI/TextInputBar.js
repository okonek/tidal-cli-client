const BaseElement = require("../../abstract/BaseElement");
const blessed = require("blessed");
const AppConfiguration = require("../../../backend/Configuration/App");

module.exports = class extends BaseElement {
	constructor(parent, options) {
		const appConfiguration = new AppConfiguration().getConfig();

		super(parent, blessed.textbox(Object.assign({}, {
			keys: true,
			style: {
				bg: appConfiguration["STYLES"]["PRIMARY_COLOR"],
				focus: {
					bg: appConfiguration["STYLES"]["SECONDARY_COLOR"]
				}
			}
		}, options)));
		this.readingInput = false;
		this.element.on("cancel", () => this.readingInput = false);
	}

	readInput(inputParser) {
		this.element.readInput((error, value) => {
			inputParser(error, value);
			this.readingInput = false;
		});
		this.readingInput = true;
	}

	get value() {
		return this.element.value;
	}

	setValue(value) {
		this.element.setValue(value);
		this.render();
	}

	clearValue() {
		this.element.clearValue();
		this.render();
	}
};
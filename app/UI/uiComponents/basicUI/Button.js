const BaseElement = require("../../abstract/BaseElement");
const blessed = require("blessed");
const AppConfiguration = require("../../../backend/Configuration/App");

module.exports = class extends BaseElement {
	constructor(parent, options) {
		const appConfiguration = new AppConfiguration().getConfig();

		super(parent, blessed.button(Object.assign({}, {
			keys: true,
			mouse: true,
			style: {
				bg: appConfiguration["STYLES"]["PRIMARY_COLOR"],
				focus: {
					bg: appConfiguration["STYLES"]["SECONDARY_COLOR"]
				}
			}
		}, options)));

		this.pressSubscribers = [];

		this.element.on("press", this.buttonPressed.bind(this));
	}

	buttonPressed() {
		if(this.pressSubscribers[0]) {
			this.pressSubscribers.map(x => {
				if(x instanceof Promise) {
					x().then(() => {}).catch(e => {throw e;});
				}
				else {
					x();
				}
			});
		}
	}

	bindOnClick(subscriber) {
		this.pressSubscribers.push(subscriber);
	}

};
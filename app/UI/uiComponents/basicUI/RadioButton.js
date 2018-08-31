const BaseElement = require("../../abstract/BaseElement");
const blessed = require("blessed");
const AppConfiguration = require("../../../backend/Configuration/App");

module.exports = class extends BaseElement {
	constructor(parent, options) {
		const appConfiguration = new AppConfiguration().getConfig();

		super(parent, blessed.radiobutton(Object.assign({}, {
			mouse: true,
			style: {
				bg: appConfiguration["STYLES"]["PRIMARY_COLOR"],
				focus: {
					bg: appConfiguration["STYLES"]["SECONDARY_COLOR"]
				}
			}
		}, options)));

		this.checkSubscribers = [];

		this.element.on("check", this.buttonSelected.bind(this));
	}

	buttonSelected() {
		if(this.checkSubscribers[0]) {
			this.checkSubscribers.map(x => {
				if(x instanceof Promise) {
					x().then(() => {}).catch(e => {throw e;});
				}
				else {
					x();
				}
			});
		}
	}

	bindOnPress(subscriber) {
		this.checkSubscribers.push(subscriber);
	}

};
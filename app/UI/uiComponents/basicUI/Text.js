const blessed = require("blessed");
const BaseElement = require("../../abstract/BaseElement");
const AppConfiguration = require("../../../backend/Configuration/App");

module.exports = class extends BaseElement {
	constructor(parent, options, text = undefined) {
		const appConfiguration = new AppConfiguration().getConfig();

		super(parent, blessed.text(Object.assign({}, {
			content: text,
			style: {
				fg: appConfiguration["STYLES"]["TEXT_COLOR"]
			}
		}, options)));

		this.options = options;
		this.text = text;
	}
};
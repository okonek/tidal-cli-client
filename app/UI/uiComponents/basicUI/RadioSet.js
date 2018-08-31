const BaseElement = require("../../abstract/BaseElement");
const blessed = require("blessed");

module.exports = class extends BaseElement {
	constructor(parent, options, children) {
		super(parent, blessed.radioset(options));
		this.children = children;
	}

	getSelectedValue() {
		return this.children.find(x => x.element.checked).element.text;
	}

	async run() {
		await this.showElements(this.children);
	}
};
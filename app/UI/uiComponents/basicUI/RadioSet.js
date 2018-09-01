const BaseElement = require("../../abstract/BaseElement");
const blessed = require("blessed");

module.exports = class extends BaseElement {
	constructor(parent, options, children) {
		super(parent, blessed.radioset(options));
		this.children = children;
	}

	getSelectedValue() {
		const checked = this.children.find(x => x.element.checked);
		return checked ? checked.element.text : undefined;
	}

	async run() {
		await this.showElements(this.children);
	}
};
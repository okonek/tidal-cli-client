const BaseElement = require("./BaseElement");

module.exports = class extends BaseElement {
	constructor(parent, element) {
		super(parent, element);
	}

	async afterShowElements() {
		if(this.children.length < 2) {
			return;
		}
		this.children.map(x => {
			x.element.key("tab", () => {
				this.focusNext();
			});
		});
	}
};
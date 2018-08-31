const blessed = require("blessed");
const BaseElement = require("../../abstract/BaseElement");

module.exports = class extends BaseElement {
	constructor(parent, options, loadingText = "Loading") {
		super(parent, blessed.loading(Object.assign({}, {}, options)));

		this.options = options;
		this.loadingText = loadingText;
	}

	load() {
		this.element.load(this.loadingText);
		this.element.show();
	}

	stop() {
		this.element.stop();
		this.element.hide();
	}


};
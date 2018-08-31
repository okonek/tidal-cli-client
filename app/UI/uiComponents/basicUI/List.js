const blessed = require("blessed");
const BaseElement = require("../../abstract/BaseElement");
const LoadingIndicator = require("../basicUI/LoadingIndicator");
const AppConfiguration = require("../../../backend/Configuration/App");

module.exports = class extends BaseElement {
	constructor(parent, options, elements, keys) {
		const appConfiguration = new AppConfiguration().getConfig();

		super(parent, blessed.list(Object.assign({}, {
			keys: true,
			mouse: true,
			style: {
				fg: appConfiguration["STYLES"]["TEXT_COLOR"],
				focus: {
					selected: {
						bg: appConfiguration["STYLES"]["SECONDARY_COLOR"]
					}
				}
			},
			items: keys
		}, options)));

		this.options = options;
		this.elements = elements;
		this.keys = keys;
		this.onItemSelect = [];
		this.noItemsText = "No items";

		this.element.focus();

		this.element.on("select", this.keySelected.bind(this));
		this.element.key(appConfiguration["SHORTCUTS"]["LIST_UP"], function () {
			this.up();
		}.bind(this));
		this.element.key(appConfiguration["SHORTCUTS"]["LIST_DOWN"], function () {
			this.down();
		}.bind(this));
	}

	up(amount = 1) {
		this.element.up(amount);
		this.render();
	}

	down(amount = 1) {
		this.element.down(amount);
		this.render();
	}

	get selected() {
		return this.element.selected;
	}

	setKeys(keys) {
		if(keys.length === 0) {
			this.setContent(this.noItemsText);
		}
		else {
			this.element.setItems(keys);
			this.render();
		}
	}

	bindOnItemSelect(onItemSelect) {
		this.onItemSelect.push(onItemSelect);
	}

	pick(callback) {
		this.element.pick(callback);
	}

	keySelected(element, index) {
		if(this.onItemSelect[0]) {
			this.onItemSelect.map(x => {
				if(x instanceof Promise) {
					x(this.elements[index]).then(() => {});
				}
				else {
					x(this.elements[index]);
				}
			});
		}
	}

	async run() {
		this.loadingIndicator = new LoadingIndicator(this, {
			left: "50%",
			top: "30%"
		});
		this.children = [this.loadingIndicator];
		await this.showElements(this.children);
	}

};
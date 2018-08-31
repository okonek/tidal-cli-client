module.exports = class {
	constructor(parent = undefined, element = undefined) {
		this.element = element;
		this.parent = parent;
		this.currentFocusedItemIndex = 0;
	}

	append(baseElement) {
		this.element.append(baseElement.element);
	}

	setContent(content) {
		this.element.setContent(content);
		this.render();
	}

	getMasterParent() {
		if(this.parent) {
			return this.parent.getMasterParent();
		}
		else {
			return this.element;
		}
	}

	show() {
		this.element.show();
		this.render();
	}

	focus() {
		this.element.focus();
		if(this.children && this.children.filter(x => !x.element.hidden).length > 0) {
			this.currentFocusedItemIndex = 0;
			this.children.filter(x => !x.element.hidden)[this.currentFocusedItemIndex].focus();
		}
		else {
			const focusedIndex = this.parent.children.findIndex(x => x.element.focused);
			this.getMasterParent().debug(focusedIndex);
			this.parent.currentFocusedItemIndex = focusedIndex > -1 ? focusedIndex : this.parent.currentFocusedItemIndex;
		}
		this.render();
	}

	hide() {
		this.element.hide();
		this.render();
	}

	getRelativeDiemensions() {
		if(this.parent) {
			let currentItem = this.parent;
			return {
				height: this.element.height / currentItem.element.height * currentItem.getRelativeDiemensions().height,
				width: this.element.width / currentItem.element.width * currentItem.getRelativeDiemensions().width
			};
		}
		else {
			return {
				width: 1,
				height: 1
			};
		}
	}

	render() {
		if(this.parent) {
			this.parent.render();
		}
		else {
			this.element.render();
		}
	}

	async afterShowElements() {
		if(!this.children || this.children.length < 2) {
			return;
		}
		this.children.map((x, i, a) => {
			x.element.key("tab", () => i === a.length - 1 ? this.parent.focusNext() : this.focusNext());
		});
	}

	focusNext() {
		this.currentFocusedItemIndex++;

		if(this.currentFocusedItemIndex === this.children.length) {
			this.currentFocusedItemIndex = 0;
		}

		this.getMasterParent().debug("dsdsd " + this.currentFocusedItemIndex);
		this.children[this.currentFocusedItemIndex].focus();
		this.getMasterParent().debug("sdsdd " + this.children.findIndex(x => x.element.focused));
	}

	async showElements(elements) {
		if(!elements) return;
		elements.map(async x => {
			this.append(x);
			if(x.run) await x.run();
		});

		this.render();
		if(this.afterShowElements) await this.afterShowElements();
	}
};
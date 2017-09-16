const Observable = require("./Observable");

module.exports = class Navigation extends Observable{
    constructor(navigationItems) {
        super();
        this.navigationItems = navigationItems;
        this.navigationTree = [];
        
    }

    show(itemName, runOptions) {
        this.navigationItems[itemName].show(this, runOptions);
        this.navigationTree.push({
            itemName: itemName,
            runOptions: runOptions
        });
    }

    back() {
        this.fire({
            type: "kill",
            item: this.navigationTree.pop().itemName
        });
        let currentItem = this.navigationTree[this.navigationTree.length - 1];
        this.navigationItems[currentItem.itemName].show(this, currentItem.runOptions);
    }

    addNavigationItem(item, name) {
        this.navigationItems[name] = item;
    }
}
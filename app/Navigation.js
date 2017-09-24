module.exports = class {

    constructor(options) {
        this.options = options;
    }

    show(item) {
        item.show(this.options);
    }
};
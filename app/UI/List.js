const blessed = require("blessed");

module.exports = class extends blessed.list {
    constructor(options, items) {

        super(Object.assign({}, {
            keys: true,
            items
        }, options));
    }
};
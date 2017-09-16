module.exports = class NavigationItem {
    constructor(onShow, onKill) {
        this.onShow = onShow;
    }

    show(navigation, options) {
        return this.onShow(navigation, options);
    }

    kill() {
        return this.onKill();
    }
}
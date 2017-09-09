class Observable {

    constructor() {
        this.handlers = [];
    }

    subscribe(handler) {
        this.handlers.push(handler);
    }

    unsubscribe(handler) {
        this.handlers = this.handlers.filter(item => item !== handler);
    }

    fire(event) {
        for(let i = 0; i < this.handlers.length; i++) {
            this.handlers[i](event);
        }
    }
}

module.exports = Observable;
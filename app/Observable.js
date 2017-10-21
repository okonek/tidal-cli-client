const fs = require("fs");

class Observable {

    constructor() {
        this.subscribers = [];
    }

    subscribe(handler, options = undefined) {
        let item = {
            handler,
            options
        };

        this.subscribers.push(item);
        return item;
    }

    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter(item => item !== subscriber);
    }

    fire(event) {
        for(let i = 0; i < this.subscribers.length; i++) {

            if(this.subscribers[i].options) {
                let areOptionsSameAsEvent = true;

                for(let option in this.subscribers[i].options) {
                    if(this.subscribers[i].options.hasOwnProperty(option)) {

                        if(event[option] !== this.subscribers[i].options[option]) {
                            areOptionsSameAsEvent = false;
                        }

                    }
                }

                if(areOptionsSameAsEvent) {
                    this.subscribers[i].handler(event);
                }
            }
            else {

                this.subscribers[i].handler(event);
            }
        }
    }
}

module.exports = Observable;
const blessed = require("blessed");
const ASCIIText = require("./ASCIIText");
const clipboardy = require("clipboardy");

module.exports = class extends blessed.box {
    constructor(options) {
        super({
            parent: options.parent
        });
        this.options = options;

        this.appName = new ASCIIText({
            parent: this,
            content: "Tidal   CLI",
            top: "center",
            left: "center",
            shrink: true
        });

        this.donationInfo = new blessed.text({
            parent: this,
            top: "5",
            left: "5",
            width: "50%",
            fg: "green",
            content: "If you liked this app and want to help me with the development, you can donate to me in Bitcoin or with PayPal\n\n" +
            "My Bitcoin address is: 1FJqNsijJpctJwsFB4LPhf7KEKNYVb1Mcd\n\n" +
            "My PayPal donations link: https://goo.gl/m2HsD6"
        });


        this.bitcoinCopyButton = new blessed.button({
            parent: this,
            left: "5",
            top: this.donationInfo.getScreenLines().length * 5 + "5",
            fg: "blue",
            content: "Copy Bitcoin address",
            mouse: true,
            keys: true,
            shrink: true,
            name: "submit",
            style: {
                bg: "blue",
                focus: {
                    bg: "#BD3017"
                },
                hover: {
                    bg: "green"
                }
            }
        });

        this.paypalCopyButton = new blessed.button({
            parent: this,
            left: 20,
            top: this.donationInfo.getScreenLines().length * 5 + "5",
            fg: "blue",
            content: "Copy PayPal address",
            mouse: true,
            keys: true,
            shrink: true,
            name: "submit",
            style: {
                bg: "blue",
                focus: {
                    bg: "#bd3017"
                },
                hover: {
                    bg: "green"
                }
            }
        });

        this.bitcoinCopyButton.focus();
        this.bitcoinCopyButton.on("press", () => {
            clipboardy.writeSync("1FJqNsijJpctJwsFB4LPhf7KEKNYVb1Mcd");
        });

        this.paypalCopyButton.on("press", () => {
            clipboardy.writeSync("https://goo.gl/m2HsD6");
        });

        this.focusableItems = [this.paypalCopyButton, this.bitcoinCopyButton];
        this.currentFocusedItem = this.bitcoinCopyButton;

        this.setupFocusingSystem();
    }

    setupFocusingSystem() {
        for(let i = 0; i < this.focusableItems.length; i++) {
            this.focusableItems[i].key("tab", () => {

                if(this.focusableItems[i + 1]) {
                    this.currentFocusedItem = this.focusableItems[i + 1];
                }
                else {
                    this.currentFocusedItem = this.focusableItems[0];
                }

                this.currentFocusedItem.focus();
            });
        }
    }
};

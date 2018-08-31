const Activity = require("../abstract/Activity");
const blessed = require("blessed");
const Text = require("../uiComponents/basicUI/Text");
const Button = require("../uiComponents/basicUI/Button");
const clipboardy = require("clipboardy");

module.exports = class extends Activity {
	constructor(parent, store) {
		super(parent, blessed.box({
			width: "100%",
			height: "95%",
		}));
		this.store = store;

		this.paypalLink = "https://goo.gl/m2HsD6";
		this.bitcoinAddress = "1FJqNsijJpctJwsFB4LPhf7KEKNYVb1Mcd";
		this.donationInfoText = "If you liked this app and want to help me with the development, you can donate to me in Bitcoin or with PayPal\n\n" +
            "My Bitcoin address is: " + this.bitcoinAddress + "\n\n" +
            "My PayPal donations link: " + this.paypalLink;
		this.paypalLinkCopyButtonText = "Copy PayPal link";
		this.bitcoinAddressCopyButtonText = "Copy Bitcoin Address";
		this.children = [];
	}

	getDonationInfoTextBox() {
		return new Text(this, {
			width: "50%",
			top: "5%",
			left: "3%",
			fg: "#2cff4a"
		}, this.donationInfoText);
	}

	getPaypalLinkCopyButton() {
		let paypalLinkCopyButton = new Button(this, {
			top: "5%",
			left: "97%-" + this.element.strWidth(this.paypalLinkCopyButtonText),
			shrink: true
		});
		paypalLinkCopyButton.setContent(this.paypalLinkCopyButtonText);
		paypalLinkCopyButton.bindOnClick(() => {
			clipboardy.writeSync(this.paypalLink);
		});

		return paypalLinkCopyButton;
	}

	getBitcoinAddressCopyButton() {
		let bitcoinAddressCopyButton = new Button(this, {
			top: "5%+2",
			left: "97%-" + this.element.strWidth(this.bitcoinAddressCopyButtonText),
			shrink: true
		});
		bitcoinAddressCopyButton.setContent(this.bitcoinAddressCopyButtonText);
		bitcoinAddressCopyButton.bindOnClick(() => {
			clipboardy.writeSync(this.bitcoinAddress);
		});

		return bitcoinAddressCopyButton;
	}

	async run() {
		this.donationInfoTextBox = this.getDonationInfoTextBox();
		this.paypalLinkCopyButton = this.getPaypalLinkCopyButton();
		this.bitcoinLinkCopyButton = this.getBitcoinAddressCopyButton();

		this.children = [this.donationInfoTextBox, this.paypalLinkCopyButton, this.bitcoinLinkCopyButton];

		await this.showElements(this.children);
		this.paypalLinkCopyButton.focus();
	}
};
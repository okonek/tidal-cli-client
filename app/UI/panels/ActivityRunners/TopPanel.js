const ActivityRunner = require("../../abstract/ActivityRunner");
const blessed = require("blessed");
const ActionsInputPanel = require("../userInputActions/ActionsInputPanel");

module.exports = class extends ActivityRunner {
	constructor(parent, store) {
		super(parent, blessed.box({
			width: "100%",
			height: "80%",
			top: 0
		}));
		this.store = store;

		this.currentActivity = undefined;
		this.currentActivityTimestamp = undefined;
		this.currentActivityArguments = [];
	}

	async storeListener() {
		await this.currentActivityChangeListener();
	}

	async currentActivityChangeListener() {
		let storeCurrentActivityTimestamp = this.store.getState().ui.currentActivity.timestamp;
		if(storeCurrentActivityTimestamp && this.currentActivityTimestamp !== storeCurrentActivityTimestamp) {
			this.currentActivity = this.store.getState().ui.currentActivity.activity;
			this.currentActivityTimestamp = storeCurrentActivityTimestamp;
			this.currentActivityArguments = this.store.getState().ui.currentActivity.arguments;
			await this.showCurrentActivity();
		}
	}

	async showCurrentActivity() {
		await this.showElements([new this.currentActivity(this, this.store, this.currentActivityArguments)]);
	}

	async run() {
		this.store.subscribe(() => this.storeListener().then());
		await this.showElements([new ActionsInputPanel(this, this.store)]);
	}
};
const Activity = require("../../abstract/Activity");
const TextInputBar = require("../../uiComponents/basicUI/TextInputBar");
const blessed = require("blessed");
const inputActions = require("./actions");
const allInputActions = {...inputActions.loginRequired, ...inputActions.loginNotRequired};
const Text = require("../../uiComponents/basicUI/Text");
const errors = require("./errors");
const conditionsBlockingActions = require("./conditionsBlockingActions");
const actions = require("../../../actions");
const AppConfiguration = require("../../../backend/Configuration/App");
const shortcutActions = require("./shortcutActions");

module.exports = class extends Activity {
	constructor(parent, store) {
		super(parent, blessed.box({
			width: "100%",
			height: "5%",
			bottom: 0
		}));

		this.store = store;
		this.children = [];
		this.appConfiguration = new AppConfiguration().getConfig();
		this.configShortcuts = this.appConfiguration["SHORTCUTS"];
		this.error = {
			message: undefined,
			timestamp: undefined,
			timeout: undefined
		};
	}

	async storeListener() {
		await this.errorChangeListener();
	}

	async errorChangeListener() {
		let storeCurrentError = this.store.getState().ui.error;
		if(storeCurrentError.timestamp && this.error.timestamp !== storeCurrentError.timestamp) {
			this.error = storeCurrentError;
			this.showError();
		}
	}

	async run() {
		this.textInputBar = this.getTextInputBar();
		this.errorBar = this.getErrorBar();

		this.children.push(this.textInputBar);
		this.children.push(this.errorBar);

		await this.showElements(this.children);
		this.errorBar.hide();

		Object.keys(this.configShortcuts).map(x => {
			this.getMasterParent().key(this.configShortcuts[x], function () {
				shortcutActions(x, this.store, this);
			}.bind(this));
		});

		this.store.subscribe(() => this.storeListener().then(() => {}));
	}

	parseUserInput(error, userInput) {
		if(error) {
			throw error;
		}

		this.textInputBar.clearValue();

		if(!userInput) {
			return;
		}

		let inputCommand = userInput.split(" ", 1)[0];
		let inputArgument = userInput.substring(userInput.indexOf(" ") + 1);
		if(inputCommand === inputArgument) {
			inputArgument = undefined;
		}

		let actionsBlocked = Object.keys(inputActions.loginNotRequired).includes(inputCommand) ? false : !conditionsBlockingActions.every(x => {
			let result = x(this.store);
			if(result instanceof Error) {
				this.store.dispatch(actions.ui.showError(result.message));
				return false;
			}
			return true;
		});

		if(allInputActions[inputCommand] && !actionsBlocked) {
			let error = allInputActions[inputCommand](this.store, inputArgument);

			if(error instanceof Error) {
				this.store.dispatch(actions.ui.showError(error.message));
			}
		}
		else if (actionsBlocked) {
			this.store.dispatch(actions.ui.showError(errors.cannotInputWhenNotLoggedIn.message));
		}
		else {
			this.store.dispatch(actions.ui.showError(errors.unexistingCommand.message));
		}
	}

	showError() {
		this.errorBar.setContent(this.error.message);
		this.errorBar.show();
		setTimeout(() => {
			this.errorBar.hide();
		}, this.error.timeout);
	}

	getErrorBar() {
		return new Text(this, {
			width: "100%",
			height: "100%",
			fg: this.appConfiguration["STYLES"]["ERROR_COLOR"],
		}, "");
	}

	showTextInputBar() {
		this.errorBar.hide();
		this.textInputBar.readInput(this.parseUserInput.bind(this));
	}

	getTextInputBar() {
		let textInputBar = new TextInputBar(this, {
			width: "100%",
			height: "100%",
		});
		this.getMasterParent().key(":", this.showTextInputBar.bind(this));

		return textInputBar;
	}
};
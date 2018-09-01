const Activity = require("../abstract/Activity");
const blessed = require("blessed");
const actions = require("../../actions");
const Text = require("../uiComponents/basicUI/Text");
const TextInputBar = require("../uiComponents/basicUI/TextInputBar");
const HomePanel = require("./HomePanel");
const Button = require("../uiComponents/basicUI/Button");
const errors = require("./userInputActions/errors");
const Credentials = require("../../backend/Configuration/Credentials");
const RadioButton = require("../uiComponents/basicUI/RadioButton");
const ApiInterface = require("../../backend/api/ApiInterface");
const RadioSet = require("../uiComponents/basicUI/RadioSet");

module.exports = class extends Activity {
	constructor(parent, store) {
		super(parent, blessed.box({
			width: "100%",
			height: "95%",
		}));
		this.store = store;

		this.children = [];
		this.textboxValues = {
			formTitle: "Signin to Tidal",
			usernameInputTitleBox: "Username",
			passwordInputTitleBox: "Password"
		};
		this.submitButtonText = "Sign in";

		this.username = undefined;
		this.password = undefined;
		this.credentialsConfig = new Credentials();
	}

	get tidalApi() {
		return this.store.getState().basic.tidalApi;
	}

	getSigninFormTitleBox() {
		return new Text(this, {
			width: "shrink",
			height: "shrink",
			top: 0,
			left: 0
		}, this.textboxValues.formTitle);
	}

	getUsernameInputTitleBox() {
		return new Text(this, {
			width: "shrink",
			height: "shrink",
			top: "20%",
			left: 0
		}, this.textboxValues.usernameInputTitleBox);
	}

	getPasswordInputTitleBox() {
		return new Text(this, {
			width: "shrink",
			height: "shrink",
			top: "50%",
			left: 0
		}, this.textboxValues.passwordInputTitleBox);
	}

	getUsernameInput() {
		let usernameInput = new TextInputBar(this, {
			width: "30%",
			height: "shrink",
			top: "30%",
		});

		usernameInput.element.key("enter", () => {
			if(!usernameInput.readingInput) {
				usernameInput.readInput(() => {});
			}
			else {
				usernameInput.readingInput = false;
				this.passwordInput.focus();
			}
		});

		return usernameInput;
	}

	getPasswordInput() {
		let passwordInput = new TextInputBar(this, {
			width: "30%",
			height: "shrink",
			top: "60%",
			censor: true
		});

		passwordInput.element.key("enter", () => {
			if(!passwordInput.readingInput) {
				passwordInput.readInput(() => {});
			}
			else {
				passwordInput.readingInput = false;
				this.qualityRadioSet.focus();
			}
		});

		return passwordInput;
	}

	getQualityRadioSet(qualityRadioButtons) {
		return new RadioSet(this, {
			top: "70%",
			width: "100%",
			shrink: true
		}, qualityRadioButtons);
	}

	getQualityRadioButton(quality, positionFromLeft) {
		return new RadioButton(this, {
			shrink: true,
			text: quality,
			left: positionFromLeft
		});
	}

	getSubmitButton() {
		let submitButton = new Button(this, {
			shrink: true,
			top: "80%"
		});
		submitButton.setContent(this.submitButtonText);
		submitButton.bindOnClick(function () {
			this.username = this.usernameInput.value;
			this.password = this.passwordInput.value;
			this.streamQuality = this.qualityRadioSet.getSelectedValue();
			this.signIn();
		}.bind(this));

		return submitButton;
	}

	signIn() {
		this.tidalApi.login(this.username, this.password, this.streamQuality).then(async () => {
			this.store.dispatch(actions.ui.setCurrentActivity(HomePanel, {}));
			this.store.dispatch(actions.basic.setTidalApiLoginState(true));
			this.credentialsConfig.saveCredentials(this.username, this.password, this.streamQuality).then();
		}).catch(error => {
			if(error.response && errors[error.response.data.userMessage]) {
				this.store.dispatch(actions.ui.showError(errors[error.response.data.userMessage].message));
				this.startInput();
			}
			else if(errors[error.message]){
				this.store.dispatch(actions.ui.showError(errors[error.message].message));
			}
		});
	}

	startInput() {
		this.usernameInput.focus();
	}

	async run() {
		const credentials = this.credentialsConfig.getCredentials();

		if(credentials.USERNAME && credentials.PASSWORD && credentials.STREAM_QUALITY) {
			this.username = credentials.USERNAME;
			this.password = credentials.PASSWORD;
			this.streamQuality = credentials.STREAM_QUALITY;
			this.signIn();
		}

		this.signinFormTitleBox = this.getSigninFormTitleBox();
		this.usernameInputTitleBox = this.getUsernameInputTitleBox();
		this.passwordInputTitleBox = this.getPasswordInputTitleBox();
		this.usernameInput = this.getUsernameInput();
		this.passwordInput = this.getPasswordInput();
		this.submitButton = this.getSubmitButton();

		this.qualityRadioButtons = Object.keys(ApiInterface.STREAM_QUALITY).map((x, i) => this.getQualityRadioButton(ApiInterface.STREAM_QUALITY[x], (i * 20) + "%"));
		this.qualityRadioSet = this.getQualityRadioSet(this.qualityRadioButtons);

		this.children = [this.signinFormTitleBox, this.usernameInputTitleBox, this.usernameInput, this.passwordInputTitleBox, this.passwordInput, this.qualityRadioSet, this.submitButton];

		await this.showElements(this.children);

		this.qualityRadioButtons[0].element.check();
		this.startInput();
	}
};
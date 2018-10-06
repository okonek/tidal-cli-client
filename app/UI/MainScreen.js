const Screen = require("./abstract/Screen");
const TopPanel = require("./panels/ActivityRunners/TopPanel");
const BottomPanel = require("./panels/ActivityRunners/BottomPanel");
const createStore = require("redux").createStore;
const reducers = require("../reducers");
const actions = require("../actions");
const TidalApi = require("../backend/api/ApiWrapper");
const TempManager = require("../backend/TempManager/TempManager");
const SigninPanel = require("./panels/SigninPanel");
const childProcess = require("child_process");

module.exports = class extends Screen {
	constructor(appArguments) {
		super();
		this.store = createStore(reducers);
		this.tidalApi = new TidalApi();
		this.tempManager = new TempManager("/tmp/tidal-cli-client");

		this.getScreenPixelRatio(appArguments).then(values => {
			this.pixelRatio = values;
			this.store.dispatch(actions.basic.setTempManager(this.tempManager));
			this.store.dispatch(actions.ui.setPixelRatio(this.pixelRatio));
			this.store.dispatch(actions.basic.setTidalApi(this.tidalApi));
			this.run().then();
		});
	}

	async exitValueChangeListener() {
		const storeCurrentExitValue = this.store.getState().basic.exit;
		if(storeCurrentExitValue) {
			this.exitApp();
		}
	}

	async storeListener() {
		await this.exitValueChangeListener();
	}

	exitApp() {
		//TODO: IMPROVE MPV SESSION EXITING METHOD
		childProcess.exec("pkill -9 mpv");
		process.exit(0);
	}

	async run() {
		this.store.subscribe(() => this.storeListener().then(() => {}));

		this.children = [new TopPanel(this, this.store), new BottomPanel(this, this.store)];
		await this.showElements(this.children);

		this.store.dispatch(actions.ui.setCurrentActivity(SigninPanel, {}));
	}

};
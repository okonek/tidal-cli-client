const Activity = require("../abstract/Activity");
const blessed = require("blessed");
const actions = require("../../actions");
const TracksList = require("../uiComponents/specializedUI/List/TracksList");
const errors = require("./userInputActions/errors");

module.exports = class extends Activity {
	constructor(parent, store) {
		super(parent, blessed.box({
			width: "shrink",
			height: "shrink",
		}));
		this.store = store;

		this.children = [this.searchTypesList];
		this.tracksQueue = [];
	}

	get tidalApi() {
		return this.store.getState().basic.tidalApi;
	}

	getQueueList() {
		return new TracksList(this, {
			width: "100%",
			height: "95%"
		}, this.store, this.tracksQueue);
	}

	async tracksQueueChangeListener() {
		let storeCurrentTracksQueue = this.store.getState().player.tracksQueue;
		if(storeCurrentTracksQueue && (storeCurrentTracksQueue.length !== this.tracksQueue.length || !storeCurrentTracksQueue.every((x, i) => x === this.tracksQueue[i].id))) {
			this.tracksQueue = await this.getTracksQueue();
			this.queueList.setElements(this.tracksQueue);
		}
	}

	async getTracksQueue() {
		if(this.tracksQueue.length > 0) {
			const tracks = this.store.getState().player.tracksQueue.map(x => this.tracksQueue.find(a => a.id === x));

			return await Promise.all(tracks.map(async (x, i) => x === undefined ? await this.tidalApi.getTrack(this.store.getState().player.tracksQueue[i]) : x));
		}
		else {
			return await Promise.all(this.store.getState().player.tracksQueue.map(async x => await this.tidalApi.getTrack(x)));
		}
	}

	async storeListener() {
		await this.tracksQueueChangeListener();
	}

	shiftSelectedQueueItem(amount) {
		const from = this.queueList.selected;
		const to = this.queueList.selected + amount;

		let shiftedTracksQueue = this.tracksQueue.map(x => x.id);
		shiftedTracksQueue.splice(to, 0, shiftedTracksQueue.splice(from, 1)[0]);
		this.store.dispatch(actions.player.setTracksQueue(shiftedTracksQueue));
	}

	async run() {
		this.store.subscribe(() => this.storeListener().then(() => {}));

		try {
			this.tracksQueue = await this.getTracksQueue();
		}
		catch (e) {
			this.store.dispatch(actions.ui.showError(errors.tidalError.message));
		}

		this.queueList = this.getQueueList();
		this.children = [this.queueList];
		await this.showElements(this.children);

		this.queueList.focus();

		this.queueList.element.key("w", function () {
			this.shiftSelectedQueueItem(-1);
		}.bind(this));

		this.queueList.element.key("s", function () {
			this.shiftSelectedQueueItem(1);
		}.bind(this));
	}
};
const Activity = require("../abstract/Activity");
const blessed = require("blessed");
const Player = require("../../backend/player/Player");
const actions = require("../../actions");
const AlbumImage = require("../uiComponents/specializedUI/Image/AlbumImage");
const TrackInfoText = require("../uiComponents/specializedUI/TrackInfoText");
const playbackStates = require("../../backend/player/Player").playbackStates;
const errors = require("./userInputActions/errors");

module.exports = class extends Activity {
	constructor(parent, store) {
		super(parent, blessed.box({
			width: "shrink",
			height: "shrink"
		}));
		this.store = store;

		this.player = new Player();
		this.currentTrack = undefined;
		this.currentTrackId = undefined;
		this.tracksQueue = [];
		this.playbackState = playbackStates.PAUSED;
		this.children = [];

		this.player.on("stopped", this.playNextTrack.bind(this));
	}

	playNextTrack() {
		if(this.tracksQueue[0]) {
			this.store.dispatch(actions.player.setCurrentTrack(this.tracksQueue.shift()));
		}
	}

	async getAlbumImage() {
		let album;

		try {
			album = await this.tidalApi.getAlbum(this.currentTrack.album);
		}
		catch (e) {
			this.store.dispatch(actions.ui.showError(errors.tidalError.message));
		}

		let imageElementOptions = {
			height: 1 * this.getRelativeDiemensions().height,
			right: 0,
			pixelRatio: this.pixelRatio
		};

		let albumImage = new AlbumImage(this, imageElementOptions, this.store, album);
		await albumImage.downloadImage();
		return albumImage;
	}

	async getTrackInfoText() {
		return new TrackInfoText(this, {
			width: "shrink",
			height: "shrink",
			left: 0
		}, this.store);
	}

	async prepareChildren() {
		this.children = [];
		this.children.push(await this.getAlbumImage());

		await this.showElements(this.children);
	}

	get tempManager() {
		return this.store.getState().basic.tempManager;
	}

	get pixelRatio() {
		return this.store.getState().ui.pixelRatio;
	}

	get tidalApi() {
		return this.store.getState().basic.tidalApi;
	}

	async playTrack() {
		let trackUrl = "";

		try {
			this.currentTrack = await this.tidalApi.getTrack(this.currentTrackId);
			this.store.dispatch(actions.player.setPlaybackState(playbackStates.LOADING));
			trackUrl = await this.tidalApi.getTrackStreamUrl(this.currentTrack.id);
		}
		catch (e) {
			this.store.dispatch(actions.ui.showError(errors.tidalError.message));
		}
		this.player.play(trackUrl);
		this.store.dispatch(actions.player.setPlaybackState(playbackStates.PLAYING));
	}

	updatePlaybackState() {
		switch(this.playbackState) {

		case playbackStates.PAUSED:
			this.player.pause();
			break;

		case playbackStates.PLAYING:
			this.player.resume();
			break;
		}
	}

	async storeListener() {
		await this.trackChangeListener();
		await this.playbackStateChangeListener();
		await this.tracksQueueChangeListener();
	}

	async trackChangeListener() {
		let storeCurrentTrackId = this.store.getState().player.currentTrack;
		if(storeCurrentTrackId && ((!this.currentTrackId) || (storeCurrentTrackId !== this.currentTrackId))) {
			this.currentTrackId = storeCurrentTrackId;
			await this.playTrack();
			await this.prepareChildren();
		}
	}

	tracksQueueChangeListener() {
		let storeCurrentTracksQueue = this.store.getState().player.tracksQueue;
		if(storeCurrentTracksQueue && (storeCurrentTracksQueue.length !== this.tracksQueue.length || !storeCurrentTracksQueue.every((x, i) => x === this.tracksQueue[i]))) {
			this.tracksQueue = storeCurrentTracksQueue;
		}
	}

	playbackStateChangeListener() {
		let storeCurrentPlaybackState = this.store.getState().player.playbackState;
		if(storeCurrentPlaybackState && this.playbackState !== storeCurrentPlaybackState) {
			this.playbackState = this.store.getState().player.playbackState;
			this.updatePlaybackState();
		}
	}

	async run() {
		this.store.subscribe(() => this.storeListener().then(() => {}));
		this.children.push(await this.getTrackInfoText());
		await this.showElements(this.children);
	}
};
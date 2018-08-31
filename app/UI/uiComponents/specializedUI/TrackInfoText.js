const Text = require("../basicUI/Text");
const playbackStates = require("../../../backend/player/Player").playbackStates;
const errors = require("../../panels/userInputActions/errors");
const actions = require("../../../actions");

module.exports = class extends Text {
	constructor(parent, options, store) {
		super(parent, options);

		this.playbackState = playbackStates.PAUSED;
		this.currentTrack = undefined;
		this.store = store;
		this.store.subscribe(() => this.storeListener().then());
		this.updateContent();
	}

	updateContent() {
		if(this.playbackState === playbackStates.LOADING) {
			this.setContent("Loading...");
		}
		else {
			this.setContent((this.currentTrack ? this.currentTrack.title + "   -   " + this.playbackState : "No track"));
		}
	}

	async storeListener() {
		this.playbackStateChangeListener();
		await this.trackChangeListener();
	}

	async trackChangeListener() {
		let storeCurrentTrackId = this.store.getState().player.currentTrack;
		if(storeCurrentTrackId && ((!this.currentTrack) || (storeCurrentTrackId !== this.currentTrack))) {
			try {
				this.currentTrack = await this.tidalApi.getTrack(storeCurrentTrackId);
			}
			catch (e) {
				this.store.dispatch(actions.ui.showError(errors.tidalError.message));
			}
			this.updateContent();
		}
	}

	playbackStateChangeListener() {
		let storeCurrentPlaybackState = this.store.getState().player.playbackState;
		if(storeCurrentPlaybackState && this.playbackState !== storeCurrentPlaybackState) {
			this.playbackState = this.store.getState().player.playbackState;
			this.updateContent();
		}
	}

	get tidalApi() {
		return this.store.getState().basic.tidalApi;
	}

};
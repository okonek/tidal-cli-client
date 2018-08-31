const Button = require("../basicUI/Button");
const actions = require("../../../actions");
const AppConfiguration = require("../../../backend/Configuration/App");

module.exports = class extends Button {
	constructor(parent, options, store, tracks) {
		super(parent, options);

		this.store = store;
		this.appConfiguration = new AppConfiguration().getConfig();
		this.tracks = tracks.map(x => x.id);
		this.functionOnButtonPress = this.playTracks;

		this.element.key(this.appConfiguration["SHORTCUTS"]["PLAY_AS_NEXT_BUTTON"], function () {
			this.functionOnButtonPress = this.playTracksNext;
			this.element.press();
		}.bind(this));

		this.element.key(this.appConfiguration["SHORTCUTS"]["PLAY_AS_LAST_BUTTON"], function () {
			this.functionOnButtonPress = this.playTracksLast;
			this.element.press();
		}.bind(this));

		this.bindOnClick(function () {
			this.functionOnButtonPress();
		}.bind(this));
	}

	playTracks() {
		this.store.dispatch(actions.player.setCurrentTrack(this.tracks[0]));
		this.store.dispatch(actions.player.setNextTracks(this.tracks.slice(1)));
	}

	playTracksNext() {
		this.store.dispatch(actions.player.setNextTracks(this.tracks));
		this.functionOnButtonPress = this.playTracks;
	}

	playTracksLast() {
		this.store.dispatch(actions.player.setLastTracks(this.tracks));
		this.functionOnButtonPress = this.playTracks;
	}
};
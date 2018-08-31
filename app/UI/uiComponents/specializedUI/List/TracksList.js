const List = require("../../basicUI/List");
const errors = require("../../../panels/userInputActions/errors");
const actions = require("../../../../actions");
const AppConfiguration = require("../../../../backend/Configuration/App");

module.exports = class extends List {
	constructor(parent, options, store, tracks) {
		super(parent, options, tracks, []);

		this.store = store;
		this.tracks = tracks;
		this.previousElements = [];
		this.artists = [];
		this.appConfiguration = new AppConfiguration().getConfig();

		this.functionOnTrackSelect = this.playSelectedTrack;
		this.bindOnItemSelect(this.trackSelected.bind(this));

		this.element.key(this.appConfiguration["SHORTCUTS"]["PLAY_AS_NEXT_BUTTON"], function() {
			this.functionOnTrackSelect = this.playSelectedTrackNext;
			this.element.enterSelected();
		}.bind(this));

		this.element.key(this.appConfiguration["SHORTCUTS"]["PLAY_AS_LAST_BUTTON"], function () {
			this.functionOnTrackSelect = this.playSelectedTrackLast;
			this.element.enterSelected();
		}.bind(this));
	}

	trackSelected(track) {
		this.functionOnTrackSelect(track);
	}

	playSelectedTrack(track) {
		this.store.dispatch(actions.player.setCurrentTrack(track.id));
	}

	playSelectedTrackNext(track) {
		this.store.dispatch(actions.player.setNextTracks(track.id));
	}

	playSelectedTrackLast(track) {
		this.store.dispatch(actions.player.setLastTracks(track.id));
	}

	loadArtists() {
		return new Promise((resolve, reject) => {
			if(this.artists.length > 0) {
				this.artists = this.elements.map(x => this.artists.find(a => a.map((y, yi) => y.id === x.artists[yi])));

				this.artists = Promise.all(this.artists.map(async (x, i) => x === undefined ? await Promise.all(this.elements[i].artists.map(async a => (await this.store.getState().basic.tidalApi.getArtist(a)))) : x))
					.then(artists => {
						this.artists = artists;
						resolve();
					}).catch(() => reject());
			}
			else {
				Promise.all(this.elements.map(async x => await Promise.all(x.artists.map(async a => (await this.store.getState().basic.tidalApi.getArtist(a))))))
					.then(artists => {
						this.artists = artists;
						resolve();
					}).catch(() => reject());
			}
		});
	}

	updateKeys() {
		this.loadArtists().then(() => {
			const keys = this.elements.map((x, i) => x.title + " - " + this.artists[i].map(y => y.name).join(", "));

			this.setKeys(keys);
			this.loadingIndicator.stop();
		}).catch(() => {
			this.store.dispatch(actions.ui.showError(errors.tidalError.message));
		});
	}

	setElements(elements) {
		this.previousElements = this.elements;
		this.elements = elements;
		this.updateKeys();
	}

	async afterShowElements() {
		this.loadingIndicator.load();

		if(this.elements) {
			this.updateKeys();
		}
	}

};
const Activity = require("../abstract/Activity");
const blessed = require("blessed");
const actions = require("../../actions");
const ArtistImage = require("../uiComponents/specializedUI/Image/ArtistImage");
const AlbumsList = require("../uiComponents/specializedUI/List/AlbumsList");
const TracksList = require("../uiComponents/specializedUI/List/TracksList");
const Text = require("../uiComponents/basicUI/Text");
const errors = require("./userInputActions/errors");

module.exports = class ArtistPanel extends Activity {
	constructor(parent, store, options) {
		super(parent, blessed.box({
			width: "100%",
			height: "95%",
		}));
		this.store = store;

		this.artistId = options.artistId;
		this.children = [];
	}

	getArtistNameBox() {
		return new Text(this, {
			width: "20%",
			height: "100%",
			left: 0
		}, this.artist.name);
	}

	async getTracksList() {
		let tracks = [];

		try {
			tracks = await this.tidalApi.getArtistTopTracks(this.artist);
		}
		catch (e) {
			this.store.dispatch(actions.ui.showError(errors.tidalError.message));
		}
		return new TracksList(this, {
			width: "30%",
			height: "100%",
			left: "20%"
		}, this.store, tracks);
	}

	async getAlbumsList() {
		let albums = [];

		try {
			albums = await this.tidalApi.getArtistAlbums(this.artist);
		}
		catch (e) {
			this.store.dispatch(actions.ui.showError(errors.tidalError.message));
		}
		return new AlbumsList(this, {
			width: "30%",
			height: "100%",
			left: "50%"
		}, this.store, albums);
	}

	async getArtistImage() {
		let imageElementOptions = {
			width: this.getRelativeDiemensions().width * 0.2,
			right: 0,
			pixelRatio: this.store.getState().ui.pixelRatio
		};

		let artistImage = new ArtistImage(this, imageElementOptions, this.store, this.artist);
		await artistImage.downloadImage();
		return artistImage;
	}

	get tidalApi() {
		return this.store.getState().basic.tidalApi;
	}

	async activityChangeListener() {
		let storeCurrentActivity = this.store.getState().ui.currentActivity.activity;
		if(storeCurrentActivity !== ArtistPanel) {
			this.artistImage.hide();
		}
	}

	async run() {
		try {
			this.artist = await this.tidalApi.getArtist(this.artistId);
		}
		catch (e) {
			this.store.dispatch(actions.ui.showError(errors.tidalError.message));
		}
		this.artistImage = await this.getArtistImage();
		this.artistNameBox = this.getArtistNameBox();
		this.tracksList = await this.getTracksList();
		this.albumsList = await this.getAlbumsList();

		this.children = [this.artistNameBox, this.tracksList, this.albumsList, this.artistImage];

		await this.showElements(this.children);

		this.albumsList.focus();

		this.store.subscribe(async () => await this.activityChangeListener());
	}
};
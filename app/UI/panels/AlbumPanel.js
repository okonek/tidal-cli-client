const Activity = require("../abstract/Activity");
const blessed = require("blessed");
const actions = require("../../actions");
const AlbumImage = require("../uiComponents/specializedUI/Image/AlbumImage");
const TracksList = require("../uiComponents/specializedUI/List/TracksList");
const Text = require("../uiComponents/basicUI/Text");
const PlayTracksButton = require("../uiComponents/specializedUI/PlayTracksButton");
const errors = require("./userInputActions/errors");

module.exports = class AlbumPanel extends Activity {
	constructor(parent, store, options) {
		super(parent,  blessed.box({
			width: "100%",
			height: "95%",
		}));
		this.store = store;

		this.playTracksButtonContent = "Play album";
		this.albumId = options.albumId;
		this.tracks = [];
		this.children = [];
	}

	getAlbumTitleBox() {
		return new Text(this, {
			width: "15%",
			height: "100%",
			left: 0
		}, this.album.title);
	}

	async getTracksList() {
		return new TracksList(this, {
			width: "50%",
			height: "100%",
			left: "30%"
		}, this.store, this.tracks);
	}

	async getAlbumImage() {
		let imageElementOptions = {
			width: this.getRelativeDiemensions().width * 0.2,
			right: 0,
			pixelRatio: this.store.getState().ui.pixelRatio
		};

		const albumImage = new AlbumImage(this, imageElementOptions, this.store, this.album);
		await albumImage.downloadImage();
		return albumImage;
	}

	getPlayAlbumButton() {
		let tracksButtonElementOptions = {
			width: "10%",
			height: "shrink",
			left: "15%"
		};

		const playTracksButton = new PlayTracksButton(this, tracksButtonElementOptions, this.store, this.tracks);
		playTracksButton.setContent(this.playTracksButtonContent);

		return playTracksButton;
	}

	get tidalApi() {
		return this.store.getState().basic.tidalApi;
	}

	async activityChangeListener() {
		let storeCurrentActivity = this.store.getState().ui.currentActivity.activity;
		if(storeCurrentActivity !== AlbumPanel) {
			this.albumImage.hide();
		}
	}

	async run() {
		try {
			this.album = await this.tidalApi.getAlbum(this.albumId);
			this.tracks = await this.tidalApi.getAlbumTracks(this.album);
		}
		catch (e) {
			this.store.dispatch(actions.ui.showError(errors.tidalError.message));
		}

		this.albumImage = await this.getAlbumImage();
		this.albumTitleBox = this.getAlbumTitleBox();
		this.tracksList = await this.getTracksList();
		this.playAlbumButton = this.getPlayAlbumButton();

		this.children = [this.albumTitleBox, this.playAlbumButton, this.tracksList, this.albumImage];

		await this.showElements(this.children);

		this.store.subscribe(async () => await this.activityChangeListener());

	}
};
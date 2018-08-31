const Activity = require("../abstract/Activity");
const blessed = require("blessed");
const PlaylistImage = require("../uiComponents/specializedUI/Image/PlaylistImage");
const TracksList = require("../uiComponents/specializedUI/List/TracksList");
const Text = require("../uiComponents/basicUI/Text");
const PlayTracksButton = require("../uiComponents/specializedUI/PlayTracksButton");
const errors = require("./userInputActions/errors");
const actions = require("../../actions");

module.exports = class PlaylistPanel extends Activity {
	constructor(parent, store, options) {
		super(parent, blessed.box({
			width: "100%",
			height: "95%",
		}));
		this.store = store;

		this.playTracksButtonContent = "Play playlist";
		this.playlistUuid = options.playlistUuid;
		this.tracks = [];
		this.children = [];
	}

	getPlaylistTitleBox() {
		return new Text(this, {
			width: "15%",
			height: "100%",
			left: 0
		}, this.playlist.title);
	}

	async getTracksList() {
		return new TracksList(this, {
			width: "50%",
			height: "100%",
			left: "30%"
		}, this.store, this.tracks);
	}

	async getPlaylistImage() {
		let imageElementOptions = {
			width: this.getRelativeDiemensions().width * 0.2,
			right: 0,
			pixelRatio: this.store.getState().ui.pixelRatio
		};

		let playlistImage = new PlaylistImage(this, imageElementOptions, this.store, this.playlist);
		await playlistImage.downloadImage();
		return playlistImage;
	}

	getPlayPlaylistButton() {
		let tracksButtonElementOptions = {
			width: "10%",
			height: "shrink",
			left: "15%",
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
		if(storeCurrentActivity !== PlaylistPanel) {
			this.playlistImage.hide();
		}
	}

	async run() {
		try {
			this.playlist = await this.tidalApi.getPlaylist(this.playlistUuid);
			this.tracks = await this.tidalApi.getPlaylistTracks(this.playlist);
		}
		catch (e) {
			this.store.dispatch(actions.ui.showError(errors.tidalError.message));
		}

		this.playlistImage = await this.getPlaylistImage();
		this.playlistTitleBox = this.getPlaylistTitleBox();
		this.tracksList = await this.getTracksList();
		this.playPlaylistButton = this.getPlayPlaylistButton();

		this.children = [this.playlistTitleBox,this.playPlaylistButton, this.tracksList, this.playlistImage];

		await this.showElements(this.children);

		this.store.subscribe(async () => await this.activityChangeListener());

	}
};
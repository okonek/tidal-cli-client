const Activity = require("../abstract/Activity");
const blessed = require("blessed");
const PlaylistsList = require("../uiComponents/specializedUI/List/PlaylistsList");
const errors = require("./userInputActions/errors");
const actions = require("../../actions");

module.exports = class extends Activity {
	constructor(parent, store) {
		super(parent, blessed.box({
			width: "100%",
			height: "95%",
		}));
		this.store = store;

		this.children = [];
	}

	async getPlaylistsList() {
		let playlists = [];

		try {
			playlists = await this.tidalApi.getUserPlaylists();
		}
		catch (e) {
			this.store.dispatch(actions.ui.showError(errors.tidalError.message));
		}

		return new PlaylistsList(this, {
			width: "100%",
			height: "100%",
			left: 0
		}, this.store, playlists);
	}

	get tidalApi() {
		return this.store.getState().basic.tidalApi;
	}

	async run() {
		this.playlistsList = await this.getPlaylistsList();
		this.children = [this.playlistsList];
		await this.showElements(this.children);
	}
};
const Image = require("../../basicUI/Image");
const errors = require("../../../panels/userInputActions/errors");
const actions = require("../../../../actions");

module.exports = class extends Image {
	constructor(parent, options, store, playlist) {
		super(parent, options);

		this.store = store;
		this.playlist = playlist;
	}

	async downloadImage() {
		let artSrc;
		if(this.store.getState().basic.tempManager.fileExists(this.playlist.coverArt)) {
			artSrc = this.store.getState().basic.tempManager.getFilePath(this.playlist.coverArt);
		}
		else {
			let artUrl = "";

			try {
				artUrl = await this.store.getState().basic.tidalApi.getArtistArtUrl(this.playlist.coverArt);
			}
			catch (e) {
				this.store.dispatch(actions.ui.showError(errors.tidalError.message));
			}

			artSrc = await this.store.getState().basic.tempManager.writeFile(this.playlist.coverArt, artUrl);
		}

		this.updateElement(artSrc);
	}


};
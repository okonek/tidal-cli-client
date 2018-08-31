const Image = require("../../basicUI/Image");
const errors = require("../../../panels/userInputActions/errors");
const actions = require("../../../../actions");

module.exports = class extends Image {
	constructor(parent, options, store, album) {
		super(parent, options);

		this.store = store;
		this.album = album;
	}

	async downloadImage() {
		let artSrc;
		if(this.store.getState().basic.tempManager.fileExists(this.album.coverArt)) {
			artSrc = this.store.getState().basic.tempManager.getFilePath(this.album.coverArt);
		}
		else {
			let artUrl = "";

			try {
				artUrl = await this.store.getState().basic.tidalApi.getAlbumArtUrl(this.album.coverArt);
			}
			catch (e) {
				this.store.dispatch(actions.ui.showError(errors.tidalError.message));
			}

			artSrc = await this.store.getState().basic.tempManager.writeFile(this.album.coverArt, artUrl);
		}

		this.updateElement(artSrc);
	}


};
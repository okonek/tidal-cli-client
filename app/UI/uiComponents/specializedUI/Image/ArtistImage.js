const Image = require("../../basicUI/Image");
const errors = require("../../../panels/userInputActions/errors");
const actions = require("../../../../actions");

module.exports = class extends Image {
	constructor(parent, options, store, artist) {
		super(parent, options);

		this.store = store;
		this.artist = artist;
	}

	async downloadImage() {
		let artSrc;
		if(this.store.getState().basic.tempManager.fileExists(this.artist.picture)) {
			artSrc = this.store.getState().basic.tempManager.getFilePath(this.artist.picture);
		}
		else {
			let picture = "";
			try {
				picture = await this.store.getState().basic.tidalApi.getArtistArtUrl(this.artist.picture);
			}
			catch (e) {
				this.store.dispatch(actions.ui.showError(errors.tidalError.message));
			}

			artSrc = await this.store.getState().basic.tempManager.writeFile(this.artist.picture, picture);
		}

		this.updateElement(artSrc);
	}


};
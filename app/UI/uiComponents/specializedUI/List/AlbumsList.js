const List = require("../../basicUI/List");
const errors = require("../../../panels/userInputActions/errors");
const actions = require("../../../../actions");
const AlbumPanel = require("../../../panels/AlbumPanel");

module.exports = class extends List {
	constructor(parent, options, store, albums) {
		super(parent, options, albums, []);

		this.store = store;

		this.bindOnItemSelect(this.openAlbumPanel.bind(this));
	}

	loadArtists() {
		Promise.all(this.elements.map(async x => {
			let artistsNames = await Promise.all(x.artists.map(async a => (await this.store.getState().basic.tidalApi.getArtist(a)).name));
			return x.title + " - " + artistsNames.join(", ");
		})).then(keys => {
			this.setKeys(keys);
			this.loadingIndicator.stop();
		}).catch(() => {
			this.store.dispatch(actions.ui.showError(errors.tidalError.message));
		});
	}

	setElements(elements) {
		this.elements = elements;
		this.loadArtists();
	}

	async afterShowElements() {
		this.loadingIndicator.load();

		if(this.elements) {
			this.loadArtists();
		}
	}

	openAlbumPanel(album) {
		this.store.dispatch(actions.ui.setCurrentActivity(AlbumPanel, {albumId: album.id}));
	}

};
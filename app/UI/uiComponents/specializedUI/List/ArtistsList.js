const List = require("../../basicUI/List");
const actions = require("../../../../actions");
const ArtistPanel = require("../../../panels/ArtistPanel");

module.exports = class extends List {
	constructor(parent, options, store, artists) {
		super(parent, options, artists, []);
		this.store = store;

		this.bindOnItemSelect(this.openArtistPanel.bind(this));
	}

	showList() {
		this.loadingIndicator.stop();
		this.setKeys(this.elements.map(x => x.name));
	}

	setElements(elements) {
		this.elements = elements;
		this.showList();
	}

	async afterShowElements() {
		this.loadingIndicator.load();

		if(this.elements) {
			this.showList();
		}
	}

	openArtistPanel(artist) {
		this.store.dispatch(actions.ui.setCurrentActivity(ArtistPanel, {artistId: artist.id}));
	}


};
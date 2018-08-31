const List = require("../../basicUI/List");
const actions = require("../../../../actions");
const PlaylistPanel = require("../../../panels/PlaylistPanel");

module.exports = class extends List {
	constructor(parent, options, store, playlists) {
		super(parent, options, playlists, []);
		this.store = store;

		this.bindOnItemSelect(this.openPlaylistPanel.bind(this));
	}

	showList() {
		this.loadingIndicator.stop();

		this.setKeys(this.elements.map(x => x.title));
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

	openPlaylistPanel(playlist) {
		this.store.dispatch(actions.ui.setCurrentActivity(PlaylistPanel, {playlistUuid: playlist.uuid}));
	}
};
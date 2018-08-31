module.exports = class {
	constructor(playlistObject) {
		this.uuid = playlistObject.uuid;
		this.title = playlistObject.title;
		this.description = playlistObject.description;
		this.coverArt = playlistObject.image;
	}
};
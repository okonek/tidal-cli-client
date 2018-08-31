module.exports = class Album {
	constructor(albumObject) {
		this.id = albumObject.id;
		this.title = albumObject.title;
		this.artists = albumObject.artists;
		this.coverArt = albumObject.coverArt;
	}
};
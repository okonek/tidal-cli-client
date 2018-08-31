module.exports = class Artist {
	constructor(artistObject) {
		this.id = artistObject.id;
		this.name = artistObject.name;
		this.tracks = [];
		this.picture = artistObject.picture;
	}
};
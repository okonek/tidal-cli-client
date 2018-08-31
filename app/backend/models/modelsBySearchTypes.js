const SearchTypes = require("../api/ApiInterface").SEARCH_TYPES;
const Album = require("./Album");
const Artist = require("./Artist");
const Playlist = require("./Playlist");
const Track = require("./Track");

module.exports = (type) => {
	switch(type) {
	case SearchTypes.ALBUMS:
		return Album;

	case SearchTypes.ARTISTS:
		return Artist;

	case SearchTypes.PLAYLISTS:
		return Playlist;

	case SearchTypes.TRACKS:
		return Track;
	}
};
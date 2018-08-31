const SearchTypes = require("../../../../backend/api/ApiInterface").SEARCH_TYPES;
const AlbumsList = require("./AlbumsList");
const TracksList = require("./TracksList");
const ArtistsList = require("./ArtistsList");
const PlaylistsList = require("./PlaylistsList");

module.exports = searchType => {
	switch (searchType) {
	case SearchTypes.ALBUMS:
		return AlbumsList;

	case SearchTypes.TRACKS:
		return TracksList;

	case SearchTypes.ARTISTS:
		return ArtistsList;

	case SearchTypes.PLAYLISTS:
		return PlaylistsList;
	}
};
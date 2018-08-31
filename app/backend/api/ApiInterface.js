module.exports = class {

	static get DEFAULT_LIMIT() {
		return 50;
	}

	static get STREAM_QUALITY() {
		return {
			LOW: "LOW",
			HIGH: "HIGH",
			LOSSLESS: "LOSSLESS"
		};
	}

	static get SEARCH_TYPES() {
		return {
			ARTISTS: "artists",
			ALBUMS: "albums",
			TRACKS: "tracks",
			PLAYLISTS: "playlists"
		};
	}

	static get ALBUM_COVER_SIZES() {
		return {
			SMALL: "sm",
			MEDIUM: "md",
			LARGE: "lg",
			XL: "xl"
		};
	}

	static get ARTIST_COVER_SIZES() {
		return {
			SMALL: "sm",
			MEDIUM: "md",
			LARGE: "lg",
		};
	}
};
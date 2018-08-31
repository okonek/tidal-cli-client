const TidalApi = require("tidal-api-wrapper-okonek");
const ApiInterface = require("./ApiInterface");
const Track = require("../models/Track");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Playlist = require("../models/Playlist");
const nodeCache = require("node-cache-promise");

module.exports = class extends ApiInterface {

	constructor() {
		super();
		this.api = new TidalApi();
		this.cache = new nodeCache();
	}

	async login(username, password, streamQuality = "HIGH") {
		this.streamQuality = streamQuality;
		return await this.api.login(username, password);
	}

	async search(query, type, limit = this.DEFAULT_LIMIT) {
		const searchResult = await this.api.search(query, type, limit);

		switch(type) {
		case ApiInterface.SEARCH_TYPES.ARTISTS:
			return await Promise.all(searchResult.map(async x => await this.getArtist(x.id)));

		case ApiInterface.SEARCH_TYPES.ALBUMS:
			return await Promise.all(searchResult.map(async x => await this.getAlbum(x.id)));

		case ApiInterface.SEARCH_TYPES.TRACKS:
			return await Promise.all(searchResult.map(async x => await this.getTrack(x.id)));

		case ApiInterface.SEARCH_TYPES.PLAYLISTS:
			return await Promise.all(searchResult.map(async x => await this.getPlaylist(x.uuid)));
		}
	}

	async getPlaylist(playlistUuid) {
		const playlistData = await this.api.getPlaylist(playlistUuid);
		return await this.createPlaylistFromPlaylistData(playlistData);
	}

	async getTrack(trackId) {
		const trackFromCache = await this.cache.get(ApiInterface.SEARCH_TYPES.TRACKS + trackId);
		if(trackFromCache) {
			return trackFromCache;
		}

		const trackData = await this.api.getTrack(trackId);
		const track = await this.createTrackFromTrackData(trackData);
		await this.cache.set(ApiInterface.SEARCH_TYPES.TRACKS + trackId, track);
		return track;
	}

	async getAlbum(albumId) {
		const albumFromCache = await this.cache.get(ApiInterface.SEARCH_TYPES.ALBUMS + albumId);
		if(albumFromCache) {
			return albumFromCache;
		}

		const albumData = await this.api.getAlbum(albumId);
		const album = await this.createAlbumFromAlbumData(albumData);
		await this.cache.set(ApiInterface.SEARCH_TYPES.ALBUMS + albumId, album);
		return album;
	}

	async getArtist(artistId) {
		const artistFromCache = await this.cache.get(ApiInterface.SEARCH_TYPES.ARTISTS + artistId);
		if(artistFromCache) {
			return artistFromCache;
		}

		const artistData = await this.api.getArtist(artistId);
		const artist = new Artist(artistData);
		await this.cache.set(ApiInterface.SEARCH_TYPES.ARTISTS + artistId, artist);
		return artist;
	}

	async getAlbumTracks(album) {
		const tracksFromCache = await this.cache.get(ApiInterface.SEARCH_TYPES.ALBUMS + ApiInterface.SEARCH_TYPES.TRACKS + album.id);
		if(tracksFromCache) {
			return tracksFromCache;
		}

		const tracksData = await this.api.getAlbumTracks(album.id);
		const tracks = await Promise.all(tracksData.map(async x => await this.createTrackFromTrackData(x)));
		await this.cache.set(ApiInterface.SEARCH_TYPES.ALBUMS + ApiInterface.SEARCH_TYPES.TRACKS + album.id, tracks);
		return tracks;
	}

	async getPlaylistTracks(playlist) {
		const tracksFromCache = await this.cache.get(ApiInterface.SEARCH_TYPES.PLAYLISTS + ApiInterface.SEARCH_TYPES.TRACKS + playlist.uuid);
		if(tracksFromCache) {
			return tracksFromCache;
		}

		const tracksData = await this.api.getPlaylistTracks(playlist.uuid);
		const tracks = await Promise.all(tracksData.map(async x => await this.createTrackFromTrackData(x)));
		await this.cache.set(ApiInterface.SEARCH_TYPES.PLAYLISTS + ApiInterface.SEARCH_TYPES.TRACKS + playlist.uuid, tracks);
		return tracks;
	}

	async getArtistAlbums(artist) {
		const albumsFromCache = await this.cache.get(ApiInterface.SEARCH_TYPES.ARTISTS + ApiInterface.SEARCH_TYPES.ALBUMS + artist.id);
		if(albumsFromCache) {
			return albumsFromCache;
		}

		const albumsData = await this.api.getArtistAlbums(artist.id);
		const albums = await Promise.all(albumsData.map(async x => await this.createAlbumFromAlbumData(x)));
		await this.cache.set(ApiInterface.SEARCH_TYPES.ARTISTS + ApiInterface.SEARCH_TYPES.ALBUMS + artist.id, albums);
		return albums;
	}

	async getArtistTopTracks(artist, limit = ApiInterface.DEFAULT_LIMIT) {
		const topTracksFromCache = await this.cache.get(ApiInterface.SEARCH_TYPES.ARTISTS + "TOP_TRACKS" + artist.id);
		if(topTracksFromCache && topTracksFromCache.length >= limit) {
			return topTracksFromCache.slice(0, limit);
		}

		const tracksData = await this.api.getArtistTopTracks(artist.id, limit);
		const tracks = await Promise.all(tracksData.map(async x => await this.createTrackFromTrackData(x)));
		await this.cache.set(ApiInterface.SEARCH_TYPES.ARTISTS + "TOP_TRACKS" + artist.id, tracks);
		return tracks;
	}

	async getAlbumArtUrl(id, size = ApiInterface.ALBUM_COVER_SIZES.LARGE) {
		const albumArtUrlFromCache = await this.cache.get(ApiInterface.SEARCH_TYPES.ALBUMS + "ART" + id);
		if(albumArtUrlFromCache) {
			return albumArtUrlFromCache[size];
		}

		const artUrls = (await this.api.albumArtToUrl(id));
		await this.cache.set(ApiInterface.SEARCH_TYPES.ALBUMS + "ART" + id, artUrls);
		return artUrls[size];
	}

	async getUserPlaylists() {
		const userPlaylistsFromCache = await this.cache.get("USER" + ApiInterface.SEARCH_TYPES.PLAYLISTS);
		if(userPlaylistsFromCache) {
			return userPlaylistsFromCache;
		}

		const userPlaylistsData = await this.api.getUserPlaylists();
		const userPlaylists = await Promise.all(userPlaylistsData.map(async x => await this.getPlaylist(x.uuid)));
		await this.cache.set("USER" + ApiInterface.SEARCH_TYPES.PLAYLISTS, userPlaylists);
		return userPlaylists;
	}

	async getArtistArtUrl(id, size = ApiInterface.ARTIST_COVER_SIZES.LARGE) {
		const artistArtUrlFromCache = await this.cache.get(ApiInterface.SEARCH_TYPES.ARTISTS + "ART" + id);
		if(artistArtUrlFromCache) {
			return artistArtUrlFromCache[size];
		}

		const artUrls = (await this.api.artistPicToUrl(id));
		await this.cache.set(ApiInterface.SEARCH_TYPES.ARTISTS + "ART" + id, artUrls);
		return artUrls[size];
	}

	async getTrackStreamUrl(id) {
		const trackStreamUrlFromCache = await this.cache.get(ApiInterface.SEARCH_TYPES.TRACKS + "STREAM_URL" + id);
		if(trackStreamUrlFromCache) {
			return trackStreamUrlFromCache;
		}

		const streamUrl = await this.api.getTrackStreamUrl(id, this.streamQuality);
		await this.cache.set(ApiInterface.SEARCH_TYPES.TRACKS + "STREAM_URL" + id, streamUrl);
		return streamUrl;
	}


	/**
     * @private
     */
	async createTrackFromTrackData(trackData) {
		return new Track({
			id: trackData.id,
			title: trackData.title,
			artists: trackData.artists.map(x => x.id),
			album: trackData.album.id
		});
	}

	async createAlbumFromAlbumData(albumData) {
		return new Album({
			id: albumData.id,
			title: albumData.title,
			artists: albumData.artists.map(x => x.id),
			coverArt: albumData.cover
		});
	}

	async createPlaylistFromPlaylistData(playlistData) {
		return new Playlist({
			uuid: playlistData.uuid,
			title: playlistData.title,
			image: playlistData.image,
			description: playlistData.description
		});
	}

};
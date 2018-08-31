const actions = {
	SET_CURRENT_TRACK: "SET_CURRENT_TRACK",
	SET_NEXT_TRACKS: "SET_NEXT_TRACK",
	SET_LAST_TRACKS: "SET_LAST_TRACK",
	SET_TRACKS_QUEUE: "SET_TRACKS_QUEUE",
	SHUFFLE_TRACKS_QUEUE: "SHUFFLE_TRACKS_QUEUE",
	SET_PLAYBACK_STATE: "SET_PLAYBACK_STATE",
	SKIP_TRACKS: "SKIP_TRACKS"
};

exports.actions = actions;

exports.setCurrentTrack = trackId => ({type: actions.SET_CURRENT_TRACK, payload: trackId});

exports.setNextTracks = tracksList => ({type: actions.SET_NEXT_TRACKS, payload: tracksList});

exports.setLastTracks = tracksList => ({type: actions.SET_LAST_TRACKS, payload: tracksList});

exports.shuffleTracksQueue = () => ({type: actions.SHUFFLE_TRACKS_QUEUE});

exports.setTracksQueue = queue => ({type: actions.SET_TRACKS_QUEUE, payload: queue});

exports.setPlaybackState = playbackState => ({type: actions.SET_PLAYBACK_STATE, payload: playbackState});

exports.skipTracks = amount => ({type: actions.SKIP_TRACKS, payload: amount});

const actions = require("../actions/index").player.actions;
const playbackStates = require("../backend/player/Player").playbackStates;

const initialState = {
	currentTrack: undefined,
	tracksQueue: [],
	playbackState: playbackStates.PAUSED
};

module.exports = (state = initialState, action) => {
	switch (action.type) {
	case actions.SET_CURRENT_TRACK:
		return Object.assign({}, state, {currentTrack: action.payload});

	case actions.SET_NEXT_TRACKS:
		if(!Array.isArray(action.payload)) {
			action.payload = [action.payload];
		}

		return {...state, tracksQueue: [...action.payload, ...state.tracksQueue]};

	case actions.SET_LAST_TRACKS:
		if(!Array.isArray(action.payload)) {
			action.payload = [action.payload];
		}

		return {...state, tracksQueue: [...state.tracksQueue, ... action.payload]};

	case actions.SET_TRACKS_QUEUE:
		return Object.assign({}, state, {tracksQueue: action.payload});

	case actions.SHUFFLE_TRACKS_QUEUE:
		return {...state, tracksQueue: state.tracksQueue.sort(() => Math.random() - .5)};

	case actions.SET_PLAYBACK_STATE:
		return Object.assign({}, state, {playbackState: action.payload});

	case actions.SKIP_TRACKS: {
		let currentTrack = state.currentTrack;
		let tracksQueue = state.tracksQueue;

		for (let i = 0; i < action.payload; i++) {
			currentTrack = tracksQueue.shift();
		}
		return Object.assign({}, state, {currentTrack, tracksQueue});
	}

	default:
		return state;
	}
};
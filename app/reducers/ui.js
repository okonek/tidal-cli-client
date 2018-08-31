const actions = require("../actions/index").ui.actions;

const initialState = {
	currentActivity: {
		activity: undefined,
		arguments: {},
		timestamp: undefined
	},
	pixelRatio: undefined,
	error: {
		message: undefined,
		timeout: undefined,
		timestamp: undefined
	}
};

module.exports = (state = initialState, action) => {
	switch (action.type) {
	case actions.SET_CURRENT_ACTIVITY:
		return Object.assign({}, state, {
			currentActivity: {
				activity: action.payload.activity,
				arguments: action.payload.argumentsObject,
				timestamp: action.payload.timestamp
			}
		});

	case actions.SHOW_ERROR:
		return Object.assign({}, state, {
			error: action.payload
		});

	case actions.SET_PIXEL_RATIO:
		return Object.assign({}, state, {pixelRatio: action.payload});

	default:
		return state;
	}
};
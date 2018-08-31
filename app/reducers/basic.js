const actions = require("../actions/index").basic.actions;

const initialState = {
	tidalApi: undefined,
	tidalApiLoginState: false,
	tempManager: undefined,
	exit: false
};

module.exports = (state = initialState, action) => {
	switch (action.type) {
	case actions.SET_TIDAL_API:
		return Object.assign({}, state, {tidalApi: action.payload});

	case actions.SET_TIDAL_API_LOGIN_STATE:
		return Object.assign({}, state, {tidalApiLoginState: action.payload});

	case actions.SET_TEMP_MANAGER:
		return Object.assign({}, state, {tempManager: action.payload});

	case actions.EXIT:
		return Object.assign({}, state, {exit: true});

	default:
		return state;
	}
};
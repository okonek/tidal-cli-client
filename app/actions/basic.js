const actions = {
	SET_TIDAL_API: "SET_TIDAL_API",
	SET_TEMP_MANAGER: "SET_TEMP_MANAGER",
	SET_TIDAL_API_LOGIN_STATE: "SET_TIDAL_API_LOGIN_STATE",
	EXIT: "EXIT"
};

exports.actions = actions;

exports.setTidalApi = tidalApi => ({type: actions.SET_TIDAL_API, payload: tidalApi});

exports.setTidalApiLoginState = loginState => ({type: actions.SET_TIDAL_API_LOGIN_STATE, payload: loginState});

exports.setTempManager = tempManager => ({type: actions.SET_TEMP_MANAGER, payload: tempManager});

exports.exit = () => ({type: actions.EXIT});

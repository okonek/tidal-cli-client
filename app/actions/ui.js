const actions = {
	SET_CURRENT_ACTIVITY: "SET_CURRENT_ACTIVITY",
	SET_PIXEL_RATIO: "SET_PIXEL_RATIO",
	SHOW_ERROR: "SHOW_ERROR"
};

exports.actions = actions;

exports.setCurrentActivity = (activity, argumentsObject) => ({type: actions.SET_CURRENT_ACTIVITY, payload: {activity, argumentsObject, timestamp: new Date()}});

exports.setPixelRatio = pixelRatio => ({type: actions.SET_PIXEL_RATIO, payload: pixelRatio});

exports.showError = (message, timeout = 5000) => ({type: actions.SHOW_ERROR, payload: {message, timeout, timestamp: new Date()}});

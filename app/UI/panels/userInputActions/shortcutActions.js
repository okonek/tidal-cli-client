const actions = require("../../../actions");

module.exports = (action, store, parent) => {
	switch (action) {
	case "OPEN_INPUT_BAR":
		parent.showTextInputBar();
		parent.textInputBar.setValue("search ");
		break;

	case "PLAY_NEXT_TRACK":
		store.dispatch(actions.player.skipTracks(1));
		break;
	}
};
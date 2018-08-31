const checkHexColor = x => /^#[0-9A-F]{6}$/i.test(x);
const checkString = x => typeof x === "string";

module.exports = {
	STYLES: {
		TEXT_COLOR: x => checkHexColor(x),
		PRIMARY_COLOR: x => checkHexColor(x),
		SECONDARY_COLOR: x => checkHexColor(x),
		ERROR_COLOR: x => checkHexColor(x)
	},
	INPUT_BAR_ACTIONS: {
		PAUSE: x => checkString(x),
		RESUME: x => checkString(x),
		PLAYLISTS: x => checkString(x),
		QUEUE: x => checkString(x),
		NEXT: x => checkString(x),
		SKIP: x => checkString(x),
		SHUFFLE: x => checkString(x),
		QUIT: x => checkString(x),
		SEARCH: x => checkString(x)
	},
	SHORTCUTS: {
		PLAY_AS_NEXT_BUTTON: x => checkString(x),
		PLAY_AS_LAST_BUTTON: x => checkString(x),
		LIST_DOWN: x => checkString(x),
		LIST_UP: x => checkString(x),
		OPEN_INPUT_BAR: x => checkString(x),
		PLAY_NEXT_TRACK: x => checkString(x)
	}
};
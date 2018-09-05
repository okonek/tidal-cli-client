const MPV = require("node-mpv");

module.exports = class {
	constructor() {
		let init_json = {
                	"audio_only": true
                }
		this.mpv = new MPV(init_json);
		this.playing = false;
	}

	static get playbackStates() {
		return {
			PAUSED: "PAUSED",
			PLAYING: "PLAYING",
			LOADING: "LOADING"
		};
	}

	on(event, callback) {
		this.mpv.on(event, callback);
	}

	play(trackUrl) {
		if(this.playing) {
			this.pause();
		}

		this.mpv.load(trackUrl);
		this.resume();
	}

	resume() {
		this.mpv.resume();
		this.playing = true;
	}

	pause() {
		this.mpv.pause();
		this.playing = false;
	}
};

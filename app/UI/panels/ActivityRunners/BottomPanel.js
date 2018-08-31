const ActivityRunner = require("../../abstract/ActivityRunner");
const PlayerPanel = require("../PlayerPanel");
const blessed = require("blessed");

module.exports = class extends ActivityRunner {
	constructor(parent, store) {
		super(parent, blessed.box({
			width: "100%",
			height: "20%",
			bottom: 0,
			border: {
				type: "line"
			},
			autoPadding: true,
			style: {
				border: {
					fg: "#FFFFFF"
				}
			},
		}));
		this.store = store;
	}

	async run() {
		await this.showElements([new PlayerPanel(this, this.store)]);
	}
};
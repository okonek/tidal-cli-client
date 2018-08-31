const Configuration = require("./abstract/Configuration");
const homeDir = require("os").homedir();
const fs = require("fs");

module.exports = class extends Configuration {
	constructor() {
		super(homeDir + "/.config/tidal-cli-client/credentials.json");

		this.typeChecker = require("./credentialsConfigTypeChecker");
		this.defaultConfig = JSON.parse(fs.readFileSync(__dirname + "/defaultCredentialsConfig.json"));
	}

	getCredentials() {
		return this.getConfig();
	}

	async saveCredentials(username = this.defaultConfig.username, password = this.defaultConfig.password, streamQuality = this.defaultConfig.streamQuality) {
		this.set("USERNAME", username);
		this.set("PASSWORD", password);
		this.set("STREAM_QUALITY", streamQuality);
		this.updateConfig();
	}
};
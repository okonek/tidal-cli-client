const Configuration = require("./abstract/Configuration");
const homeDir = require("os").homedir();
const fs = require("fs");

module.exports = class extends Configuration {
	constructor() {
		super(homeDir + "/.config/tidal-cli-client/app.json");

		this.defaultConfig = JSON.parse(fs.readFileSync(__dirname + "/defaultAppConfig.json"));
		this.typeChecker = require("./appConfigTypeChecker");
	}

	prepareConfigFile() {
		if(!this.exists) {
			this.writeConfig(this.defaultConfig);
		}
	}
};

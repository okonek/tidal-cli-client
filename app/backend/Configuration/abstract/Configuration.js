const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const keysDiff = require("keys-diff");

module.exports = class {
	constructor(configurationFileLocation) {
		this.configurationFileLocation = configurationFileLocation;
		this.config = {};
	}

	set(key, value) {
		this.config[key] = value;
	}

	get exists() {
		return fs.existsSync(this.configurationFileLocation);
	}

	updateConfig(config = this.config) {
		mkdirp.sync(path.dirname(this.configurationFileLocation));
		fs.writeFileSync(this.configurationFileLocation, JSON.stringify({...this.getConfig(), ...config}), "utf8");
	}

	writeConfig(config = this.config) {
		mkdirp.sync(path.dirname(this.configurationFileLocation));
		fs.writeFileSync(this.configurationFileLocation, JSON.stringify(config), "utf8");
	}

	writeBackupFile(config = this.config) {
		mkdirp.sync(path.dirname(this.configurationFileLocation));
		fs.writeFileSync(this.configurationFileLocation + ".bak", JSON.stringify(config), "utf8");
	}

	checkConfig(config) {
		if(this.defaultConfig) {
			const configDifference = keysDiff(config, this.defaultConfig);

			if(configDifference[0].length > 0 || configDifference[1].length > 0) {
				this.writeConfig(this.defaultConfig);
				this.writeBackupFile(this.defaultConfig);
				throw new Error("Your config file is invalid. New, correct file has been generated and the old is now under the name " + this.configurationFileLocation + ".bak");
			}
		}
		if(this.typeChecker) {
			const checkObject = (checker, object) => Object.keys(checker).map(x => Object.keys(checker[x]).length > 0 ? checkObject(checker[x], object[x]) : checker[x](object[x]));
			const deepFlatten = a => a.reduce((acc, val) => Array.isArray(val) ? acc.concat(deepFlatten(val)) : acc.concat(val), []);

			if(!deepFlatten(checkObject(this.typeChecker, config)).every(x => x)) {
				throw new Error("YO");
			}
		}
	}

	getConfig() {
		let config = {};

		if(fs.existsSync(this.configurationFileLocation)) {
			config = JSON.parse(fs.readFileSync(this.configurationFileLocation, "utf8"));
			this.checkConfig(config);
		}

		return config;
	}


};
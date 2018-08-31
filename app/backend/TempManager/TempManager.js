const fs = require("fs-extra");
const validUrl = require("valid-url");
const https = require("https");
const path = require("path");

module.exports = class {
	constructor(tempDir) {
		this.tempDir = tempDir;

		this.createTempDir();
	}

	async writeFile(fileName, fileSrc) {
		return new Promise((resolve) => {
			const pathToWrite = this.getFilePath(fileName, path.extname(fileSrc).split(".").join(""));
			if(validUrl.isUri(fileSrc)) {
				let file = fs.createWriteStream(pathToWrite);
				https.get(fileSrc, response => {
					response.pipe(file);
					file.on("finish", () => {
						resolve(pathToWrite);
					});
				});
			}
			else {
				let stream = fs.createWriteStream(pathToWrite);
				fs.createReadStream(fileSrc).pipe(stream);
				stream.on("finish", () => {
					resolve(pathToWrite);
				});
			}
		});
	}

	getFilePath(fileName, extension = undefined) {
		let filenames = fs.readdirSync(this.tempDir);
		let searchedFileIndex = filenames.map(x => x.split(".")[0]).indexOf(fileName);

		if(!extension) {
			extension = filenames[searchedFileIndex];
		}

		return this.tempDir + "/" + fileName + "." + extension;
	}

	fileExists(fileName) {
		return fs.existsSync(this.getFilePath(fileName));
	}

	createTempDir() {
		try {
			fs.mkdirSync(this.tempDir);
		}
		catch(err) {
			if(err.code !== "EEXIST") throw err;
		}
	}

	removeTempDir() {
		fs.removeSync(this.tempDir);
	}
};
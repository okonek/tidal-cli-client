const blessed = require("blessed");
const BaseElement = require("./BaseElement");
const fs = require("fs");

module.exports = class Screen extends BaseElement {
	constructor() {
		super();
		this.element = blessed.screen({
			smartCSR: true,
			grabKeys: false,
		});
	}

	getScreenPixelRatio() {
		return new Promise((resolve, reject) => {
			const img = blessed.image({
				parent: this.screen,
				type: "overlay"
			});
			if(!(Screen.findFile("/usr", "w3mimgdisplay") || Screen.findFile("/lib", "w3mimgdisplay") || Screen.findFile("/bin", "w3mimgdisplay"))) {
				resolve(undefined);
			}

			img.getPixelRatio((error, ratio) => {
				if(error) {
					reject(error);
				}
				else {
					resolve(ratio);
				}
			});
		});
	}

	static findFile (start, target) {
		return (function read(dir) {
			let files, file, stat, out;

			if (dir === "/dev" || dir === "/sys"
				|| dir === "/proc" || dir === "/net") {
				return null;
			}

			try {
				files = fs.readdirSync(dir);
			} catch (e) {
				files = [];
			}

			for (let i = 0; i < files.length; i++) {
				file = files[i];

				if (file === target) {
					return (dir === "/" ? "" : dir) + "/" + file;
				}

				try {
					stat = fs.lstatSync((dir === "/" ? "" : dir) + "/" + file);
				} catch (e) {
					stat = null;
				}

				if (stat && stat.isDirectory() && !stat.isSymbolicLink()) {
					out = read((dir === "/" ? "" : dir) + "/" + file);
					if (out) return out;
				}
			}

			return null;
		})(start);
	}
};
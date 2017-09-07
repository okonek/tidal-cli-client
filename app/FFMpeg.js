const exec = require("child_process").exec;

module.exports = class FFMpeg {
    constructor(source) {
        this.child = exec('ffmpeg -i "'+source+'" -f alsa ""');
    }
}
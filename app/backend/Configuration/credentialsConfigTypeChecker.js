const ApiInterface = require("../api/ApiInterface");

const checkString = x => typeof x === "string";

module.exports = {
	USERNAME: x => checkString(x),
	PASSWORD: x => checkString(x),
	STREAM_QUALITY: x => Object.values(ApiInterface.STREAM_QUALITY).includes(x)
};
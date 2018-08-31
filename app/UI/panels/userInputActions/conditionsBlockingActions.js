const errors = require("./errors");

module.exports = [
	store => store.getState().basic.tidalApiLoginState === false ? errors.cannotInputWhenNotLoggedIn : false
];
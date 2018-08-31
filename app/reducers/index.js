const combineReducers = require("redux").combineReducers;
const basic = require("./basic");
const player = require("./player");
const ui = require("./ui");
module.exports = combineReducers({basic, player, ui});

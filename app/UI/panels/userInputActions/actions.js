const playbackStates = require("../../../backend/player/Player").playbackStates;
const actions = require("../../../actions");
const SearchPanel = require("../SearchPanel");
const errors = require("./errors");
const QueuePanel = require("../QueuePanel");
const UserPlaylistsPanel = require("../UserPlaylistsPanel");
const AppConfiguration = require("../../../backend/Configuration/App");
const appConfiguration = new AppConfiguration().getConfig();

module.exports = {
	loginRequired: {
		[appConfiguration["INPUT_BAR_ACTIONS"]["PAUSE"]]: store => store.dispatch(actions.player.setPlaybackState(playbackStates.PAUSED)),
		[appConfiguration["INPUT_BAR_ACTIONS"]["RESUME"]]: store => store.dispatch(actions.player.setPlaybackState(playbackStates.PLAYING)),
		[appConfiguration["INPUT_BAR_ACTIONS"]["SEARCH"]]: (store, searchValue) => {
			if (!searchValue) {
				return errors.undefinedSearchValue;
			}
			store.dispatch(actions.ui.setCurrentActivity(SearchPanel, {searchValue}));
		},
		[appConfiguration["INPUT_BAR_ACTIONS"]["PLAYLISTS"]]: store => store.dispatch(actions.ui.setCurrentActivity(UserPlaylistsPanel, {})),
		[appConfiguration["INPUT_BAR_ACTIONS"]["QUEUE"]]: store => store.dispatch(actions.ui.setCurrentActivity(QueuePanel, {})),
		[appConfiguration["INPUT_BAR_ACTIONS"]["NEXT"]]: store => store.dispatch(actions.player.skipTracks(1)),
		[appConfiguration["INPUT_BAR_ACTIONS"]["SKIP"]]: (store, amount = 1) => store.dispatch(actions.player.skipTracks(amount)),
		[appConfiguration["INPUT_BAR_ACTIONS"]["SHUFFLE"]]: store => store.dispatch(actions.player.shuffleTracksQueue()),
	},
	loginNotRequired: {
		[appConfiguration["INPUT_BAR_ACTIONS"]["QUIT"]]: store => store.dispatch(actions.basic.exit())
	}
};
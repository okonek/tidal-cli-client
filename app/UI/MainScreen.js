const NavigationItem = require("../NavigationItem");
const blessed = require("blessed");
const TracksList = require("./TracksList");
const TidalApi = require("../TidalApi");
const Track = require("../Track");
const PlayerPanel = require("./PlayerPanel");
const Player = require("../Player");
const Artist = require("../Artist");
const SearchModule = require("./SearchModule");
const ActivityPanel = require("./ActivityPanel");
const Observable = require("../Observable");
const ShortcutsModule = require("./ShortcutsModule");
const SkipTracksModule = require("./SkipTracksModule");

module.exports = class MainScreen extends NavigationItem {

    static get eventTypes() {
        return {
            PLAY_TRACKS: 0,
            ADD_TRACKS_TO_QUEUE: 1,
            SHOW_ARTIST_PANEL: 2,
            HIDE_CURRENT_PANEL: 3,
            SHOW_CURRENT_PANEL: 4,
            SHOW_ALL_PLAYLISTS_PANEL: 5,
            SHOW_PLAYLIST_PANEL: 6,
            SHOW_ALBUM_PANEL: 7,
            SKIP_TRACKS: 8,
            PLAY_TRACKS_NEXT: 9
        };
    }

    constructor(tidalApi) {
        super();
        this.tidalApi = tidalApi;
        this.screen = blessed.screen({
            smartCSR: true,
            grabKeys: false
        });

        this.getScreenPixelRatio().then((pixelRatio) => {
            this.pixelRatio = pixelRatio;

            this.communicationEvents = new Observable();

            this.slavesOptions = {
                screen: this.screen,
                tidalApi: this.tidalApi,
                communicationEvents: this.communicationEvents,
                pixelRatio: this.pixelRatio
            };


            this.prepareKeybindings();
            this.startModules();
            this.startActivityPanel();
            this.startPlayerPanel();
            this.prepareCommunicationWithModules();

            this.activityPanel.show();
            this.activityPanel.showPanel(ActivityPanel.panels.START_PANEL, {});

            this.screen.render();
        }).catch((error) => {

        });

    }

    startModules() {
        this.searchModule = new SearchModule(this.slavesOptions);
        this.skipTracksModule = new SkipTracksModule(this.slavesOptions);
        this.shortcutsModule = new ShortcutsModule(this.slavesOptions, {
            searchModule: this.searchModule,
            skipTracksModule: this.skipTracksModule
        });
    }

    prepareKeybindings() {
        this.screen.key(["escape", "q", "C-c"], () => {
            this.playerPanel.player.stop();
            return process.exit(0);
        });

        this.screen.key([":"], () => {
            this.shortcutsModule.run();
        });

        this.screen.key(["C-p"], () => {
            this.communicationEvents.fire({
                type: MainScreen.eventTypes.SHOW_ALL_PLAYLISTS_PANEL
            });
        });
    }

    startActivityPanel() {
        this.activityPanel = new ActivityPanel(this.slavesOptions);
        this.screen.append(this.activityPanel);
        this.activityPanel.show();
    }

    startPlayerPanel() {
        this.playerPanel = new PlayerPanel(this.slavesOptions);
        this.screen.append(this.playerPanel);
        this.playerPanel.show();
    }

    prepareCommunicationWithModules() {
        this.communicationEvents.subscribe(async (event) => {
            switch (event.type) {
                case MainScreen.eventTypes.PLAY_TRACKS:
                    this.playTracks(event.tracks);
                    break;

                case MainScreen.eventTypes.ADD_TRACKS_TO_QUEUE:
                    this.addTracksToQueue(event.tracks);
                    break;

                case MainScreen.eventTypes.PLAY_TRACKS_NEXT:
                    this.playTracksNext(event.tracks);
                    break;

                case MainScreen.eventTypes.SKIP_TRACKS:
                    this.playerPanel.player.skipTracks(event.tracksCount);
                    break;

                case MainScreen.eventTypes.SHOW_ARTIST_PANEL:
                    this.activityPanel.show();
                    let artist = event.artist;
                    await artist.updateArt(this.tidalApi);
                    await artist.updateTracks(this.tidalApi);
                    await artist.updateAlbums(this.tidalApi);
                    this.activityPanel.showPanel(ActivityPanel.panels.ARTIST_PANEL, {artist});
                    this.screen.render();
                    break;

                case MainScreen.eventTypes.SHOW_ALBUM_PANEL:
                    this.activityPanel.show();
                    let album = event.album;
                    await album.updateCoverArt(this.tidalApi);
                    await album.updateTracks(this.tidalApi);
                    this.activityPanel.showPanel(ActivityPanel.panels.ALBUM_PANEL, {album});
                    this.screen.render();
                    break;

                case MainScreen.eventTypes.SHOW_PLAYLIST_PANEL:
                    let playlist = event.playlist;
                    await playlist.updateArt(this.tidalApi);
                    await playlist.updatePlaylistTracks(this.tidalApi);
                    this.activityPanel.show();
                    this.activityPanel.showPanel(ActivityPanel.panels.PLAYLIST_PANEL, {playlist});
                    this.screen.render();
                    break;

                case MainScreen.eventTypes.SHOW_ALL_PLAYLISTS_PANEL:
                    this.activityPanel.show();
                    this.activityPanel.showPanel(ActivityPanel.panels.ALL_PLAYLISTS_PANEL);
                    this.screen.render();
                    break;

                case MainScreen.eventTypes.HIDE_CURRENT_PANEL:
                    this.activityPanel.hideCurrentPanel();
                    this.screen.render();
                    break;

                case MainScreen.eventTypes.SHOW_CURRENT_PANEL:
                    this.activityPanel.show();
                    this.activityPanel.focus();
                    this.activityPanel.showCurrentPanel();
                    this.screen.render();
                    break;
            }
        });
    }

    addTracksToQueue(tracks) {
        for(let i = 0; i < tracks.length; i++) {
            let track = tracks[i];
            this.playerPanel.player.addTrackToQueue(track);
        }
    }

    playTracksNext(tracks) {
        for(let i = tracks.length - 1; i >= 0; i--) {
            let track = tracks[i];
            this.playerPanel.player.playTrackNext(track);
        }
    }

    playTracks(tracks) {
        let track = tracks.shift();
        this.playerPanel.player.play(track);

        this.playTracksNext(tracks);
    }

    getScreenPixelRatio() {
        return new Promise((resolve, reject) => {
            blessed.image({
                parent: this.screen,
                type: "overlay"
            }).getPixelRatio((error, ratio) => {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(ratio);
                }
            });
        });
    }

};
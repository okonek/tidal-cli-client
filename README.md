# tidal-cli-client
[![Build Status](https://travis-ci.org/okonek/tidal-cli-client.svg?branch=master)](https://travis-ci.org/okonek/tidal-cli-client) [![BCH compliance](https://bettercodehub.com/edge/badge/okonek/tidal-cli-client?branch=master)](https://bettercodehub.com/)

tidal-cli-client is an open-source Tidal client for your linux terminal. You can finally listen to your favourite tracks without any web wrappers and flash. With your loved terminal. &lt;3

## Donations
If you like this app and you want to help me with the development, you can donate me some money, so I can buy more RAM for my Chrome.

I'm 14 years old passionated JS developer and this app is a big success for me. I would appreciate every donation.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QMX8LHNPXVL4Y)

Here is my Bitcoin address: `1FJqNsijJpctJwsFB4LPhf7KEKNYVb1Mcd`

![My Bitcoin address QR code](https://user-images.githubusercontent.com/24360027/38766930-e4610220-3fc8-11e8-91e5-da55e1ae4811.png)


## Update 2.0.0 notes
The app is now completly rewritten. Most of the new features are:
* More abstraction with components and cleaner code.
* Better error handling.
* Caching every api request.
* Configurable shortcuts.
* Unit tests
* Playback queue control

## Important dependencies
Installation sources:
* It is prefered to install `tidal-cli-client` package from npm using command `sudo npm -g i tidal-cli-client@latest`. After installation you can run app from anywhere using command `tidal-cli`.

* If you don't want to use npm installation you can clone this repo. Then you install other dependencies with `npm install` and run with `npm run app`.  

You must have MPV and W3M installed. On some systems you'll also need to check, if you have got w3m-img, because it is not always installed directly with w3m.

## Usage instructions
When you open app for the first time you can see a form. Input username (first) and password (second) to the boxes and submit. Then it loads the main app.

To change focus from one item to another, press `tab`.

### Action bar
On the bottom of the app there is a green bar. When you press `:` it automatically focuses itself. Most of the navigation in the app is based on this text input. The list of commands is as follows:

| Command     | Description                                                           | Example               |
|-------------|-----------------------------------------------------------------------|-----------------------|
| `search`    | Searches for a query specified after space                            | `search Led Zeppelin` |
| `queue`     | Opens tracks queue panel, where you can view and edit playback queue  | `queue`               |
| `pause`     | Pauses playback                                                       | `pause`               |
| `resume`    | Resumes playback                                                      | `resume`              |
| `skip`      | Skips a number of tracks in queue specified after space               | `skip 3`              |
| `next`      | Works as `skip 1`                                                     | `resume`              |
| `shuffle`   | Shuffles a tracks queue randomly                                      | `shuffle`             |
| `playlists` | Opens user playlists panel where you can view and play your playlists | `playlists`           |
| `quit`      | Quits from the app                                                    | `quit`                |

### Shortcuts
You can press these keys at any point and they'll do their thing.

| Shortcut | Description                                                                                    |
|----------|------------------------------------------------------------------------------------------------|
| `F2`     | Opens actions input bar and automatically enters `search `. Then you can only enter your query |
| `n`      | When focused on the list item or playback button adds focused element to the queue as next     |
| `a`      | When focused on the list item or playback button adds focused element to the queue as last     |
| `l`      | Play next track from queue. Works as `next`                                                    |
| `j`      | When focused on the list, goes up                                                              |
| `k`      | When focused on the list, goes down                                                            |
| `w`      | When on the playback queue list, moves selected item up in queue                               |
| `s`      | When on the playback queue list, moves selected item down in queue                             |

## Config file
The apps config file is located in `~/.config/tidal-cli-client/app.json`. You can configure your shortcuts from there. 

* `STYLES` object contains all of apps **colors** are located. You can customize them as you like with HEX color codes.

* `INPUT_BAR_ACTION` object contains all [**action bar**](#action-bar) actions are stored. You can edit their values to fit your preference.

* `SHORTCUTS` object contains all of apps [**shortcuts**](#shortcuts) which you can customize as you wish.
> Shortcut naming for *Ctrl-(key)* is *C-(key)*, for function keys it's *f(key)*

Your login credentials are stored in `~/.config/tidal-cli-client/credentials.json`. You can edit this file if you want to.

* `USERNAME` is your username

* `PASSWORD` is your password

* `STREAM_QUALITY` is TIDAL's stream quality, either `LOW`, `HIGH` or `LOSSLESS`.

## For developers
If you want to help me with the development, create a fork on Github and clone it to your machine.

Call `npm install`. After the work call `npm run test` to check for any errors and the you can create a PR.

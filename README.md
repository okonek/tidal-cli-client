# tidal-cli-client 
[![Build Status](https://travis-ci.org/okonek/tidal-cli-client.svg?branch=master)](https://travis-ci.org/okonek/tidal-cli-client) [![BCH compliance](https://bettercodehub.com/edge/badge/okonek/tidal-cli-client?branch=master)](https://bettercodehub.com/)

You can now use Tidal on linux. With your loved CLI. &lt;3

Available also as download from npm: https://www.npmjs.com/package/tidal-cli-client

You can also install it from AUR: https://aur.archlinux.org/packages/tidal-cli-client/

## Donations
If you like this app and you want to help me with the development, you can donate me some money, so I can buy more RAM for my Chrome.

I'm 14 years old passionated JS developer and this app is a big success for me. I would appreciate every donation.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QMX8LHNPXVL4Y)

Here is my Bitcoin address: `1FJqNsijJpctJwsFB4LPhf7KEKNYVb1Mcd`

![My Bitcoin address QR code](https://user-images.githubusercontent.com/24360027/38766930-e4610220-3fc8-11e8-91e5-da55e1ae4811.png)


## Update 1.5.0 notes
For better issue tracking app now sends all errors to the sentry.io. None of your personal data is collected. When you have an error and want to resolve it, create a Github Issue and pass me the error eventId.

## Important dependencies
You must have MPV and W3M installed. On some systems you'll also need to check, if you have got w3m-img, because it is not always installed directly with w3m.

If the app throws an error that you haven't got them installed, it means it couldn't find the path of them. You can change the default path in which the app looks for dependencies by adding it to the config file in the `~/.tidalConfig.js`.

Install other dependencies with `npm install` and run with `npm run app`. 

You can also install `tidal-cli-client` from npm. Install it using command `sudo npm -g i tidal-cli-client@latest`. After installation you can run app from anywhere using command `tidal-cli`.

## Config file
The apps config file is located in `~/.tidalConfig.js`. If sign in again again, you have to remove it. 

You can edit your login creditnails here or change the default path of one of the dependencies by simply adding it to the list. 

## Usage instructions
When you open app for the first time you can see a form. Input username (first) and password (second) to the boxes and submit. Then it loads the main app. 

To change focus from one item to another in the artist panel, album panel or playlist panel, press `tab`. The focused item is colored red.

To close this app simply press escape.

### Search
To search for a track, press `:` and enter `search`. Then type in `track`, `artist` or `album`, depending on what do you want to search for. Press enter again and then input your query and confirm with enter.

### Playlists
To list all of your playlists press `Control-P`. I'll show you a list. Select the playlist you want with enter and it'll show you its details.

### Playback control
To pause the playback press `Control-S`. To start press it again. 

To play a song select it on list using enter (mouse not working yet). To add it to the end of the queue press `a` on it, to add it as next to the queue, press `n`.

When playing, if you want to skip to the next song press `:` and then type `next`. If you want to skip for example four songs in the queue, press `:`, type `skip`, press enter and then type the number of songs you want to skip, in this case `4` and press enter.



![Signin form in tidal-cli](https://user-images.githubusercontent.com/24360027/34915577-60560934-f929-11e7-80d0-2282680f09c5.png)

![Searching for artist in tidal-cli](https://user-images.githubusercontent.com/24360027/34915576-60372c3a-f929-11e7-964d-f98fcc951926.png)

![Artist panel in tidal-cli](https://user-images.githubusercontent.com/24360027/34915622-de49b8e0-f929-11e7-9960-e626405d8e71.png)

![Searching for track in tidal-cli](https://user-images.githubusercontent.com/24360027/34915577-60560934-f929-11e7-80d0-2282680f09c5.png)

![Tracks list in tidal-cli](https://user-images.githubusercontent.com/24360027/34915580-60ca4a1a-f929-11e7-9073-5860fcb84a86.png)


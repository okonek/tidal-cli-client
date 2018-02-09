# tidal-cli-client 
[![Build Status](https://travis-ci.org/okonek/tidal-cli-client.svg?branch=master)](https://travis-ci.org/okonek/tidal-cli-client) [![BCH compliance](https://bettercodehub.com/edge/badge/okonek/tidal-cli-client?branch=master)](https://bettercodehub.com/)

You can now use Tidal on linux. With your loved CLI. &lt;3

## IMPORTANT DEPENDENCIES
You must have MPV and W3M installed.

Install other dependencies with `npm install` and run with `npm run app`. 

You can also install `tidal-cli-client` from npm. Install it using command `sudo npm -g i tidal-cli-client@latest`. After installation you can run app from anywhere using command `tidal-cli`.

## Usage instructions
When you open app for the first time you can see a form. Input username (first) and password (second) to the boxes and submit. Then it loads the main app. 

### Search
To search for a track, click `:` and enter `track`, then input your query and click enter.
To search for an artist, you should do the same but instead of `track` use `artist`.

To play a song select it on list. To add it to queue press `n` on it.

To close this app simply press escape and to pause playback press `Control-S`.
All the other parts of using the app are intuitive.

The login configuration is kept in your home directory under filename `.tidalConfig.js`. To signin once again you can remove it. And run the app once again.

![Signin form in tidal-cli](https://user-images.githubusercontent.com/24360027/34915577-60560934-f929-11e7-80d0-2282680f09c5.png)

![Searching for artist in tidal-cli](https://user-images.githubusercontent.com/24360027/34915576-60372c3a-f929-11e7-964d-f98fcc951926.png)

![Artist panel in tidal-cli](https://user-images.githubusercontent.com/24360027/34915622-de49b8e0-f929-11e7-9960-e626405d8e71.png)

![Searching for track in tidal-cli](https://user-images.githubusercontent.com/24360027/34915577-60560934-f929-11e7-80d0-2282680f09c5.png)

![Tracks list in tidal-cli](https://user-images.githubusercontent.com/24360027/34915580-60ca4a1a-f929-11e7-9073-5860fcb84a86.png)


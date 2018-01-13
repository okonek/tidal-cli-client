# tidal-cli-client 
[![Build Status](https://travis-ci.org/okonek/tidal-cli-client.svg?branch=master)](https://travis-ci.org/okonek/tidal-cli-client) [![BCH compliance](https://bettercodehub.com/edge/badge/okonek/tidal-cli-client?branch=master)](https://bettercodehub.com/)

You can now use Tidal on linux. With your loved CLI. &lt;3

Install dependencies with `npm install` and run with `npm run app`. 

You must have MPV installed.

Now also available on npm. You can install it using command "sudo npm -g i tidal-cli-client". After installation you can run app from anywhere using command `tidal-cli`.

## Usage instructions
When you open app for the first time you can see a form. Input username (first) and password (second) to the boxes and submit. Then it loads the main app. 

### Search
To search for a track, click `:` and enter `track`, then input your query and click enter.
To search for an artist, you should do the same but instead of `track` use `artist`.

To close this app simply press escape and to pause playback press `Control-S`.
All the other parts of using the app are intuitive.

The login configuration is kept in your home directory under filename `.tidalConfig.js`. To signin once again you can remove it. And run the app once again.

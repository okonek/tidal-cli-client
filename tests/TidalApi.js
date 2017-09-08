const chai = require("chai");
const mocha = require("mocha");
const expect = chai.expect;
const assert = chai.assert;
const TidalApi = require("../app/TidalApi");
const config = require("../config");

describe("Api for Tidal music", () => {
    let tidalApi = new TidalApi({
        username: process.env.TIDAL_USERNAME,
        password: process.env.TIDAL_PASSWORD,
        token: process.env.TIDAL_TOKEN,
        quality: "HIGH"
    });

    it("search for track", async () => {
        let tracks = await tidalApi.searchForTrack("Pigs Pink Floyd");
        assert(tracks.length <= 10, "track list is bigger than 10");

        let isAnyTrackNull = false;
        for(let track of tracks) {
            if(!track) {
                isAnyTrackNull = true;
                break;
            }
        }
        assert(isAnyTrackNull === false, "one or more track objects are null");
    });

    it("get track URL", async () => {
        let trackURL = await tidalApi.getTrackURL(7909724);

        assert(trackURL, "track URL cant be null");
        assert(trackURL.substring(0, 7) === "rtmp://", "track URL must start with rtmp://");
    });

});
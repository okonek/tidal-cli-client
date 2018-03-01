const chai = require("chai");
const mocha = require("mocha");
const expect = chai.expect;
const assert = chai.assert;
const TidalApi = require("../app/TidalApi");
const path = require("path");

describe("Api for Tidal music", async () => {
    let tidalApi = new TidalApi({
        username: "irrma@o2.pl",
        password: "w1mpprobny",
        token: "BI218mwp9ERZ3PFI",
        quality: "HIGH"
    });

    let tracks = await tidalApi.searchFor("Pigs Pink Floyd", TidalApi.searchTypes.TRACKS);

    it("search for track", () => {
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
        let trackURL = await tidalApi.getTrackURL(tracks[0]);

        assert(trackURL, "track URL cant be null");
    });

});
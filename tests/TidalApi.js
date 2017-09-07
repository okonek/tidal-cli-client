const chai = require("chai");
const mocha = require("mocha");
const expect = chai.expect;
const assert = chai.assert;
const TidalApi = require("../app/TidalApi");
const config = require("../config");

describe("Api for Tidal music", () => {
    let tidalApi = new TidalApi(config);

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
        assert(!isAnyTrackNull, "one or more track objects are null");
    });

});
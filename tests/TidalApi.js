const chai = require("chai");
const mocha = require("mocha");
const expect = chai.expect;
const TidalApi = require("../app/TidalApi");

describe("Api for Tidal music", () => {
    it("returns tracks list maximum 10", () => {
        let tidalApi = new TidalApi({
            username: "48698489766",
            password: "w1mpw1mp",
            token: "wdgaB1CilGA-S_s2",
            quality: "HIGH"
        });
        
    });
});
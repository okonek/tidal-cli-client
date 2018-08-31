const chai = require("chai");
const chaiFs = require("chai-fs");
chai.use(chaiFs);

const expect = chai.expect;
const request = require("then-request");
const fs = require("fs");
const TempManager = require("../../app/backend/TempManager/TempManager");
let manager;
const tempDir = "/tmp/tidal-cli-client-tests";
const testFileName = "test";
const testFileSrc = __dirname + "/../testFile.txt";
const testFileContent = fs.readFileSync(testFileSrc, "utf8");
const fileExtension = "txt";

const onlineTestFileName = "online_test";
const onlineTestFileUrl = "https://www.w3.org/TR/PNG/iso_8859-1.txt";

describe("TempManager", async () => {

    beforeEach(() => {
        manager = new TempManager(tempDir);
    });

    describe("writeFile()", async () => {
        it("writeFile() should write a file to a temp directory with passed name and return the written file src if existing file is passed", async () => {
            let fileSrc = await manager.writeFile(testFileName, testFileSrc);

            expect(fileSrc).to.be.a.file().with.content(testFileContent);
        });

        it("writeFile() should write a file to a temp directory with passed name and return the written file src if existing file from url is passed", async () => {
            const onlineTestFileContent = await request("GET", onlineTestFileUrl).getBody("utf8");
            let fileSrc = await manager.writeFile(onlineTestFileName, onlineTestFileUrl);

            expect(fileSrc).to.be.a.file().with.content(onlineTestFileContent);
        });
    });

    describe("getFilePath()", async () => {
        it("getFilePath() should return a file path in temp dir with the name and extension passed", async () => {
            let fileSrc = manager.getFilePath(testFileName, fileExtension);

            expect(fileSrc).to.be.a("string");
            expect(fileSrc).to.equal(tempDir + "/" + testFileName + "." + fileExtension);
            manager.removeTempDir();
        });
    });
});

// We recommend to not use this at all for now
require('dotenv').config();

const path = require('path'),
      mocha = require('mocha'),
      MochaFactory = require('mocha-factory');

// Your test files and export path
const TEST_SCRIPTS_DIR = path.resolve(__dirname);
const EXPORT_DIR = path.resolve(__dirname, '../export');

// Grab all the tests
const testList = MochaFactory.convertHtmlFileToJsFile(TEST_SCRIPTS_DIR,EXPORT_DIR)
                 .map((f) => require(f));

describe('Selenium tests - made by IDE', function() {
  it("Runnign IDE tests" , function(done) {

    // Biggest Hack ever - this is actually max it will allow
    this.timeout(999999999);

    MochaFactory.runIDEtests({
      selenium_server_remote: process.env.SELENIUM_SERVER_REMOTE,
      browser_name: 'chrome'
    }, testList, done);

  });
});

import { expect } from 'chai';
import webdriver from 'selenium-webdriver';

// Setup Webdrivers
var By = webdriver.By,
    until = webdriver.until;

// Use environcment vars to change browser and remote
// Undefined SELENIUM_SERVER_REMOTE will default to your local PC
// Undefined Browser will default to phantomjs
const browser = process.env.SELENIUM_BROWSER || 'phantomjs';
const seleniumRemote = process.env.SELENIUM_SERVER_REMOTE;

var googleWindow = new webdriver.Builder()
    .forBrowser(browser)
    .usingServer(seleniumRemote)
    .build();

// Just to demonstrate multi drivers
var appleWindow = new webdriver.Builder()
    .forBrowser(browser)
    .usingServer(seleniumRemote)
    .build();

// Write the tests
describe("Journey Tests - Google and Apple", function() {

  // UI tests are slow especially with this internet
  this.timeout(10000);

  it("Goes to google", function(done) {
    // Just normal Javascript tests NOT RECOMMENDED
    googleWindow.get('http://www.google.com');
    googleWindow.wait(until.titleIs('Google'), 5000);

    // Use a Chai expect
    googleWindow.getTitle().then(function(title) {
      expect(title).to.equal('Google');
      done();
    });

    googleWindow.quit();
  });

  it("Goes to Apple", function(done){
    // Multi browser
    appleWindow.get('http://www.apple.com');
    appleWindow.wait(until.titleIs('Apple'),5000);
    appleWindow.getTitle().then(function(title) {
      expect(title).to.equal('Apple');
      done();
    });
  });

  xit("Ignored test", function(done){
    // Multi browser
    appleWindow.get('http://www.apple.com');
    appleWindow.wait(until.titleIs('Apple'),5000);
    appleWindow.getTitle().then(function(title) {
      console.log(title);
      expect(title).to.equal('Not Apple');
      done();
    });
    appleWindow.quit();
  });

});

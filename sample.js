require('babel-register')();
require('dotenv').config();

var MochaFactory = require('./lib/mocha-factory.js');

var testList = MochaFactory.convertHtmlFileToJsFile('./selenium','./selenium/export').map((f) => require(f));

MochaFactory.runIDEtests({
  selenium_server_remote: process.env.SELENIUM_SERVER_REMOTE,
  browser_name: 'chrome'
},
testList,
()=>{
  console.log("Complete/Callback");
});

require('babel-register')();
require('dotenv').config();

var MochaFactory = require('./lib/mocha-factory.js');

var testList = MochaFactory.convertHtmlFileToJsFile('./selenium','./selenium/export');

var list_of_test_functions = new Array();

for( test of testList ){
  list_of_test_functions.push(require(test));
};

MochaFactory.runIDEtests({
  test_scripts_dir: './selenium',
  exports_dir: './selenium/export',
  selenium_server_remote: process.env.SELENIUM_SERVER_REMOTE,
  browser_name: 'chrome'
},
list_of_test_functions,
()=>{
  console.log("Complete/Callback");
});

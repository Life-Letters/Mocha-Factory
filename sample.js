require('babel-register')();
var MochaFactory = require('./lib/mocha-factory.js');

var testList = MochaFactory.convertHtmlFileToJsFile('./selenium','./selenium/export');

console.log(testList);

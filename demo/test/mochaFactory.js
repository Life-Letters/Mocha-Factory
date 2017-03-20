require('dotenv').config();

// Babel our imports
require('babel-register')({
  // Ignore everything in node_modules except node_modules/rcomponents.
  ignore: /node_modules\/(?!mocha-factory)/
});

var server = require('../server.js');
var MochaFactory = require('mocha-factory');

MochaFactory.setup({
  testTitle : `${process.env.npm_package_name} - Unit tests - ${process.env.NODE_ENV}`,
  slackHook : process.env.SLACK_DEVELOPMENT_HOOK_URL,
  username: 'Florey',
  channel: '#deployment'
});


// Let tests to be added as args so its easier to control / more native Mocha-ish
// Usage in CLI: node test/mochaFactory.js ./test/Unit ./test/Journey etc...
const suites = process.argv.slice(2);

// Add your test files
suites.map(testPath => MochaFactory.addFiles(testPath, '.spec.js'));

// Run the mocha test
MochaFactory.run();

// Gotta close the server
MochaFactory.mocha.suite.afterAll( function() {
  server.close();
});

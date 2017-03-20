// Babel our imports
require('babel-register')();
require('dotenv').config();

// Serve our app
var MochaFactory = require('mocha-factory');

MochaFactory.setup({
  testTitle : `${process.env.npm_package_name} - Selenium IDE tests - ${process.env.NODE_ENV}`,
  slackHook : process.env.SLACK_DEVELOPMENT_HOOK_URL,
  username: 'Florey',
  channel: '#deployment'
});

// Add each .js file to the mocha instance
MochaFactory.addFiles('./test/Journey/selenium','test-runner.js');

// Run the mocha test
MochaFactory.run();

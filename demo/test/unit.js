require('dotenv').config();

// Babel our imports
require('babel-register')({
  // Ignore everything in node_modules except node_modules/rcomponents.
  ignore: /node_modules\/(?!mocha-factory)/
});

var MochaFactory = require('mocha-factory');

MochaFactory.setup({
  testTitle : `${process.env.npm_package_name} - Unit tests - ${process.env.NODE_ENV}`,
  slackHook : process.env.SLACK_DEVELOPMENT_HOOK_URL,
  username: 'Florey',
  channel: '#deployment'
});

// Add your test files
MochaFactory.addFiles('./test/Unit','.js');

// Run the mocha test
MochaFactory.run();

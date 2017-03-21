require('dotenv').config();

// Babel mocha-factory
require('babel-register')({ ignore: /node_modules\/(?!mocha-factory)/ });

// You will require mocha-factory as an import normally
var MochaFactory = require('../../src/mocha-factory.js');

// Pick your logger service, undefined goes to console
MochaFactory.setup({ CI_LOGGER_URL: process.env.CI_LOGGER_URL });

// Let tests to be added as args so its easier to control / more native Mocha-ish
// Usage in CLI: node test/mochaFactory.js ./test/Unit ./test/Journey etc...
const suites = process.argv.slice(2);

// Add your test files
suites.map(testPath => MochaFactory.addFiles(testPath, '.spec.js'));

// Run the mocha test
MochaFactory.run();

const requireHacker = require('require-hacker');
const cssHook = require('css-modules-require-hook');
const sass = require('node-sass');
const tildeImporter = require('node-sass-tilde-importer');
const jsdom = require('jsdom').jsdom;
const fs = require('fs');
const Mocha = require('mocha');
const recursiveReadSync = require('recursive-readdir-sync');
const logReporter = require('./logger-reporter');

// Files that we need to bypass require else enzyme won't work.
const ignoredExtensions = [
  'png',
  'gif',
  'jpg',
  'jpeg',
  'svg',
  'm4a',
  'mp3',
  'wav',
  'mp4'
];

// Loop through the ignored file extensions and bypass requires (else breaks enzyme)
for (var ext of ignoredExtensions) {
  requireHacker.hook(ext, () => 'module.exports = ""');
}

// Pre process css with css-modules and sass so we will always get the same hash in tests
cssHook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  extensions: ['.scss', '.css'],
  preprocessCss: (data, filename) =>
    sass.renderSync({
      data,
      file: filename,
      importer: tildeImporter // Finds nearest node_modules for '~' imports, which webpack allows
    }).css
});

// Directly required by enzyme when using jsdom
// https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

// Might need, this was in enzyme-example-mocha
// documentRef = document;

// Instantiate a Mocha instance.
const mochaInstance = new Mocha();

// Expose Mocha Instance
export const mocha = mochaInstance;

// Any pre-setup is done here, expected to be run
export const setup = config => {
  if (!process.env.CI_LOGGER_URL) {
    return;
  }
  mochaInstance.reporter(logReporter);
};

// Adds Mocha suites, adds recursively subfolders too
export const addFiles = (dir, ext) => {
  // Add each .js file to the mocha instance
  try {
    recursiveReadSync(dir)
      .filter(function(file) {
        // Only keep the .js files
        return file.substr(-ext.length) === ext;
      })
      .forEach(function(file) {
        mochaInstance.addFile(file);
      });
  } catch (err) {
    if (err.errno === 34) {
      console.log('Path does not exist');
      return;
    }

    throw err;
  }
};

// Runs the tests
export const run = () => {
  mochaInstance.growl().run(function(failures) {
    process.on('exit', function() {
      process.exit(failures); // exit with non-zero status if there were failures
    });
  });
};

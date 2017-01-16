// Babel all our imports
require('babel-register')();

var requireHacker = require('require-hacker'),
    hook = require('css-modules-require-hook'),
    sass = require('node-sass'),
    jsdom = require('jsdom').jsdom,
    fs = require('fs'),
    path = require('path'),
    Mocha = require('mocha');

// Dont bother with Static files
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
]

for (var ext of ignoredExtensions){
  requireHacker.hook(ext, () => 'module.exports = ""');
}

hook({
    generateScopedName: '[name]__[local]___[hash:base64:5]',
    extensions: [ '.scss', '.css' ],
    preprocessCss: (data, filename) =>
      sass.renderSync({
        data,
        file: filename,
      }).css,
});

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

// Might need this was in enzyme-example-mocha
// documentRef = document;

// Instantiate a Mocha instance.
var mochaInstance = new Mocha();

// Run the tests.
export const mocha = mochaInstance;

// Basically just sets up reporter for now

export const setup = (config) => {
  if(!config.slackHook) return;
  // Remap the slackHook to url just made it slackHook so its more descriptive
  config.url = config.slackHook;
  mochaInstance.reporter('mocha-ci-slack-reporter', config);
}

// Adds Mocha suites
export const addFiles = (dir,ext) => {
  // Add each .js file to the mocha instance
  fs.readdirSync(dir).filter(function(file){
      // Only keep the .js files
      return file.substr(-ext.length) === ext;
  }).forEach(function(file){
      mochaInstance.addFile(path.join(dir, file));
  });
}

// Runs the tests
export const run = () => {
  mochaInstance.growl().run(function(failures){
    process.on('exit', function () {
      process.exit(failures);  // exit with non-zero status if there were failures
    });
  });
}

// Babel all our imports
require('babel-register')();
require('dotenv').config();

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

// Integrate with Slack if available
if(process.env.SLACK_DEVELOPMENT_HOOK_URL){
  mochaInstance.reporter('mocha-ci-slack-reporter',{
    testTitle: `${process.env.npm_package_name} - (${process.env.NODE_ENV}) - Unit tests`,
    url: process.env.SLACK_DEVELOPMENT_HOOK_URL,
    username: `Florey`,
    channel: '#deployment'
  });
}

// Run the tests.
export const mocha = mochaInstance;

export const run = () => {
  mochaInstance.growl().run(function(failures){
    process.on('exit', function () {
      process.exit(failures);  // exit with non-zero status if there were failures
    });
  });
}

export const addFiles = (dir,ext) => {
  // Add each .js file to the mocha instance
  fs.readdirSync(dir).filter(function(file){
      // Only keep the .js files
      return file.substr(-ext.length) === ext;
  }).forEach(function(file){
      mochaInstance.addFile(path.join(dir, file));
  });
}

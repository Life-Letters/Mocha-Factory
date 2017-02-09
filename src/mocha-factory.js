// Babel all our imports
require('babel-register')();

var requireHacker = require('require-hacker'),
    hook = require('css-modules-require-hook'),
    sass = require('node-sass'),
    jsdom = require('jsdom').jsdom,
    fs = require('fs'),
    converter = require('selenium-html-js-converter'),
    Mocha = require('mocha'),
    wdSync = require('wd-sync'),
    ping = require('ping'),
    colors = require('colors/safe'),
    recursiveReadSync = require('recursive-readdir-sync');
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
};

// Adds Mocha suites
export const addFiles = (dir,ext) => {
  // Add each .js file to the mocha instance
  try {
    recursiveReadSync(dir).filter(function(file){
        // Only keep the .js files
        return file.substr(-ext.length) === ext;
    }).forEach(function(file){
        mochaInstance.addFile(file);
    });
  } catch(err){

    if(err.errno === 34) {
      console.log('Path does not exist');
      return;
    }

    throw err;
  }
};

// Runs the tests
export const run = () => {
  mochaInstance.growl().run(function(failures){
    process.on('exit', function () {
      process.exit(failures);  // exit with non-zero status if there were failures
    });
  });
};

// Selenium HTML to js exporter
export const convertHtmlFileToJsFile = (test_scripts_dir, exports_dir) => {

  // Store list of tests so we can return it;
  var list_of_tests = new Array();

  // Convert your tests
  fs.readdirSync(test_scripts_dir).map((file)=>{
    if(file.substr(-5) === '.html'){

      // Convert the file and save it into exports folder
      console.log('converting', file);
      const output_fileName = `${exports_dir}\/${file.split('.')[0]}.js`;
      converter.convertHtmlFileToJsFile(`${test_scripts_dir}\/${file}`, output_fileName);

      // Push it into exported array
      list_of_tests.push(output_fileName);
    }
  })

  return list_of_tests;

};

// Expect config like this
// {
//  selenium_server_remote: xxxxx
//  browser_name: xxxxx
// }
export const runIDEtests = (config, list_of_test_functions , done) =>{

  // Cheap way to check if there is even a host
  if(config.selenium_server_remote){
    ping.sys.probe(config.selenium_server_remote, function(isAlive){
      if(!isAlive){
        console.log(`selenium_server_remote ${config.selenium_server_remote} cannot be reached`);
        process.exit(1);
      }
    });
  }

  const client = wdSync.remote(config.selenium_server_remote || undefined),
        browser = client.browser,
        sync = client.sync;

  sync(function(){
    browser.init( { browserName: config.browser_name} );
    for(var test of list_of_test_functions){
      console.log(`Test Begin : ${test.name}`);
      test(browser);
      console.log(colors.green(`Test Pass✓ : ${test.name}`));
    }
    browser.quit();
    // Callback, useful for mocha
    if(typeof done === 'function') done();
  });
}

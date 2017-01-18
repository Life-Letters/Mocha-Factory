(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-register"), require("require-hacker"), require("css-modules-require-hook"), require("node-sass"), require("jsdom"), require("fs"), require("path"), require("selenium-html-js-converter"), require("mocha"), require("wd-sync"), require("ping"), require("colors/safe"));
	else if(typeof define === 'function' && define.amd)
		define("mocha-factory", ["babel-register", "require-hacker", "css-modules-require-hook", "node-sass", "jsdom", "fs", "path", "selenium-html-js-converter", "mocha", "wd-sync", "ping", "colors/safe"], factory);
	else if(typeof exports === 'object')
		exports["mocha-factory"] = factory(require("babel-register"), require("require-hacker"), require("css-modules-require-hook"), require("node-sass"), require("jsdom"), require("fs"), require("path"), require("selenium-html-js-converter"), require("mocha"), require("wd-sync"), require("ping"), require("colors/safe"));
	else
		root["mocha-factory"] = factory(root["babel-register"], root["require-hacker"], root["css-modules-require-hook"], root["node-sass"], root["jsdom"], root["fs"], root["path"], root["selenium-html-js-converter"], root["mocha"], root["wd-sync"], root["ping"], root["colors/safe"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Babel all our imports
	__webpack_require__(1)();
	
	var requireHacker = __webpack_require__(2),
	    hook = __webpack_require__(3),
	    sass = __webpack_require__(4),
	    jsdom = __webpack_require__(5).jsdom,
	    fs = __webpack_require__(6),
	    path = __webpack_require__(7),
	    converter = __webpack_require__(8),
	    Mocha = __webpack_require__(9),
	    wdSync = __webpack_require__(10),
	    ping = __webpack_require__(11),
	    colors = __webpack_require__(12);
	
	// Dont bother with Static files
	var ignoredExtensions = ['png', 'gif', 'jpg', 'jpeg', 'svg', 'm4a', 'mp3', 'wav', 'mp4'];
	
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;
	
	try {
	  for (var _iterator = ignoredExtensions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	    var ext = _step.value;
	
	    requireHacker.hook(ext, function () {
	      return 'module.exports = ""';
	    });
	  }
	} catch (err) {
	  _didIteratorError = true;
	  _iteratorError = err;
	} finally {
	  try {
	    if (!_iteratorNormalCompletion && _iterator['return']) {
	      _iterator['return']();
	    }
	  } finally {
	    if (_didIteratorError) {
	      throw _iteratorError;
	    }
	  }
	}
	
	hook({
	  generateScopedName: '[name]__[local]___[hash:base64:5]',
	  extensions: ['.scss', '.css'],
	  preprocessCss: function () {
	    function preprocessCss(data, filename) {
	      return sass.renderSync({
	        data: data,
	        file: filename
	      }).css;
	    }
	
	    return preprocessCss;
	  }()
	});
	
	var exposedProperties = ['window', 'navigator', 'document'];
	
	global.document = jsdom('');
	global.window = document.defaultView;
	Object.keys(document.defaultView).forEach(function (property) {
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
	var mocha = exports.mocha = mochaInstance;
	
	// Basically just sets up reporter for now
	
	var setup = exports.setup = function () {
	  function setup(config) {
	    if (!config.slackHook) return;
	    // Remap the slackHook to url just made it slackHook so its more descriptive
	    config.url = config.slackHook;
	    mochaInstance.reporter('mocha-ci-slack-reporter', config);
	  }
	
	  return setup;
	}();
	
	// Adds Mocha suites
	var addFiles = exports.addFiles = function () {
	  function addFiles(dir, ext) {
	    // Add each .js file to the mocha instance
	    fs.readdirSync(dir).filter(function (file) {
	      // Only keep the .js files
	      return file.substr(-ext.length) === ext;
	    }).forEach(function (file) {
	      mochaInstance.addFile(path.join(dir, file));
	    });
	  }
	
	  return addFiles;
	}();
	
	// Runs the tests
	var run = exports.run = function () {
	  function run() {
	    mochaInstance.growl().run(function (failures) {
	      process.on('exit', function () {
	        process.exit(failures); // exit with non-zero status if there were failures
	      });
	    });
	  }
	
	  return run;
	}();
	
	// Selenium HTML to js exporter
	var convertHtmlFileToJsFile = exports.convertHtmlFileToJsFile = function () {
	  function convertHtmlFileToJsFile(test_scripts_dir, exports_dir) {
	
	    // Store list of tests so we can return it;
	    var list_of_tests = new Array();
	
	    // Convert your tests
	    fs.readdirSync(test_scripts_dir).map(function (file) {
	      if (file.substr(-5) === '.html') {
	
	        // Convert the file and save it into exports folder
	        console.log('converting', file);
	        var output_fileName = exports_dir + '/' + file.split('.')[0] + '.js';
	        converter.convertHtmlFileToJsFile(test_scripts_dir + '/' + file, output_fileName);
	
	        // Push it into exported array
	        list_of_tests.push(output_fileName);
	      }
	    });
	
	    return list_of_tests;
	  }
	
	  return convertHtmlFileToJsFile;
	}();
	
	// Expect config like this
	// {
	//  selenium_server_remote: xxxxx
	//  browser_name: xxxxx
	// }
	var runIDEtests = exports.runIDEtests = function () {
	  function runIDEtests(config, list_of_test_functions, done) {
	
	    // Cheap way to check if there is even a host
	    if (config.selenium_server_remote) {
	      ping.sys.probe(config.selenium_server_remote, function (isAlive) {
	        if (!isAlive) {
	          console.log('selenium_server_remote ' + config.selenium_server_remote + ' cannot be reached');
	          process.exit(1);
	        }
	      });
	    }
	
	    var client = wdSync.remote(config.selenium_server_remote || undefined),
	        browser = client.browser,
	        sync = client.sync;
	
	    sync(function () {
	      browser.init({ browserName: config.browser_name });
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = list_of_test_functions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var test = _step2.value;
	
	          console.log('Test Begin : ' + test.name);
	          test(browser);
	          console.log(colors.green('Test Pass\u2713 : ' + test.name));
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
	            _iterator2['return']();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	
	      browser.quit();
	      // Callback, useful for mocha
	      if (typeof done === 'function') done();
	    });
	  }
	
	  return runIDEtests;
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-register");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("require-hacker");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("css-modules-require-hook");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("node-sass");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("jsdom");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("selenium-html-js-converter");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("mocha");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("wd-sync");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("ping");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("colors/safe");

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mocha-factory.js.map
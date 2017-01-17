(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-register"), require("require-hacker"), require("css-modules-require-hook"), require("node-sass"), require("jsdom"), require("fs"), require("path"), require("selenium-html-js-converter"), require("mocha"), require("wd-sync"), require("ping"), require("colors"));
	else if(typeof define === 'function' && define.amd)
		define("mocha-factory", ["babel-register", "require-hacker", "css-modules-require-hook", "node-sass", "jsdom", "fs", "path", "selenium-html-js-converter", "mocha", "wd-sync", "ping", "colors"], factory);
	else if(typeof exports === 'object')
		exports["mocha-factory"] = factory(require("babel-register"), require("require-hacker"), require("css-modules-require-hook"), require("node-sass"), require("jsdom"), require("fs"), require("path"), require("selenium-html-js-converter"), require("mocha"), require("wd-sync"), require("ping"), require("colors"));
	else
		root["mocha-factory"] = factory(root["babel-register"], root["require-hacker"], root["css-modules-require-hook"], root["node-sass"], root["jsdom"], root["fs"], root["path"], root["selenium-html-js-converter"], root["mocha"], root["wd-sync"], root["ping"], root["colors"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__) {
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

	/* WEBPACK VAR INJECTION */(function(global, process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Babel all our imports
	__webpack_require__(2)();
	
	var requireHacker = __webpack_require__(3),
	    hook = __webpack_require__(4),
	    sass = __webpack_require__(5),
	    jsdom = __webpack_require__(6).jsdom,
	    fs = __webpack_require__(7),
	    path = __webpack_require__(8),
	    converter = __webpack_require__(9),
	    Mocha = __webpack_require__(10),
	    wdSync = __webpack_require__(11),
	    ping = __webpack_require__(12),
	    colors = __webpack_require__(13);
	
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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mocha-factory.js.map
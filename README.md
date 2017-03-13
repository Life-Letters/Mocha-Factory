# Overview

The mocha factory does the heavy lifting of setting up the testing in the Florey pipeline.


# Setup

Some environment variables are expected. Optional is marked with <OPTIONAL_...> else its required. For development make a `.env` file in root:

```
NODE_ENV="local"
SLACK_DEVELOPMENT_HOOK_URL="<OPTIONAL_URL>"
```


# How to use

The Factory exposes these methods/objects;

```
// A Mocha instance same as if you did new Mocha()
// Useful to bind before/afters
MochaFactory.mocha.afterAll( function() {
  server.close();
});

// Setup the instance
MochaFactory.setup({
  testTitle : `Sample-Project - Unit tests`,
  slackHook : process.env.SLACK_DEVELOPMENT_HOOK_URL, <-- you can use envs to make life easier
  username: 'Florey',
  channel: '#deployment'
});

// Adds files with 2 params, Directory and 2nd is extension
MochaFactory.addFiles('./test/Journey/JsTests','.js');

// Just runs your tests
MochaFactory.run();

// Helper function for Html to js with selenium IDE tests
const testList = MochaFactory.convertHtmlFileToJsFile(TEST_SCRIPTS_DIR,EXPORT_DIR).map((f) => require(f));

// Runing Selenium IDE tests , assumes you've converted them into runnable test functions by the 'convertHtmlToJsFile' methods
MochaFactory.runIDEtests({
  selenium_server_remote: process.env.SELENIUM_SERVER_REMOTE,
  browser_name: 'chrome'
}, testList, done);
```


# Helpful information

- [Selenium IDE HTML to JS](https://github.com/flyingfisher/selenium-html-js-converter)  
Used to help webdriver run tests directly from selenium IDE outputs (in html).

- [Enzyme](https://github.com/airbnb/enzyme)  
React testing framework

- [Mocha](https://www.npmjs.com/package/mocha)  
Very popular testing framework

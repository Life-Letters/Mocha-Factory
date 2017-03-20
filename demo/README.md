# Example testing structure

Example projects how to write tests in Enzyme/Mocha/Chai and use the mocha-factory library.

As an overview theres 3 types of tests, They can be ran with the following commands:

Note : Selenium tests are not considered part of the usual suite for now. Suggest you write your journeys as webdriver/journey tests if they are critical.

```
npm run test:unit
npm run test:journey
npm run test:selenium

// With watch
npm run watch:test:unit
```

Some environment variables are expected. Optional is marked with <OPTIONAL_...> else its required. For development make a '.env' file in root:  
For this Project we use port 3999 and the journey test scripts assume that port

```
NODE_ENV='local'
PORT='3999'
SELENIUM_REMOTE_HUB='http://xxx.xx.xx.xx:4444/wd/hub' <-- the actual selenium hub
SELENIUM_BROWSER='phantomjs'
SLACK_DEVELOPMENT_HOOK_URL='<OPTIONAL_URL>' <-- from mocha-factory
SELENIUM_SERVER_REMOTE='SOME_IP'

// These 2 are to demonstrate real requests and integration testing
TEST_USER='test@test.com'
TEST_PASS='test'

// Heroku specific
NPM_CONFIG_PRODUCTION = false <--- installs dev dependencies to allow testing
NODE_MODULES_CACHE = true/false <--- If you want to bust the cache
```

##### NOTE - please use Char in ur .env single quote else wd-sync.remote breaks

Look at these files to see how to set them up in your own Project

```
test/unit.js
test/journey.js
test/selenium.js
```

## Unit, Classes, React Components

These tests are in the test/Unit folder. They are a mix of Class/Function/Component level tests.
Please note you must import the scss files in your tests.

[Enzyme api docs](http://airbnb.io/enzyme/docs/api/index.html)

Files to look at :

```
'test/unit.js'
```

Script to run the demo

```
npm run test:unit
```

## Journey Testing

Testing UI from a browser perspective using Selenium/Chrome/PhantomJs/Selenum-webdriver  
Note: You must install the correct webdrivers please refer here [selenium-webdriver](https://github.com/SeleniumHQ/selenium/tree/master/javascript/node/selenium-webdriver)

ChromeDriver: To use chrome, download this then need to unzip the package and then copy the file to /usr/local/bin.

If you go remotely you also need the selenium hub which comes with the selenium-standalone binary [selenium-standalone](https://www.npmjs.com/package/selenium-standalone)

Files to look at :

```
'test/journey.js'
```

Script to run the demo

```
npm run test:journey
```

##### Selenium IDE Script formats - Do not use for now

Because the Selenium RC doesnt even accept Javascript its a bit awkward working with Javascript testing scripts.

The selenium test script will parse the default saved format (html) of the Selenium IDE in firefox using Selenium-Html-js-converter and execute them. Btw you need selenium-standalone installed

[selenium-html-js-converter](https://www.npmjs.com/package/selenium-html-js-converter)  
[selenium-standalone](https://www.npmjs.com/package/selenium-standalone)

Install Selenium IDE for easier test generation [selenium-ide](https://addons.mozilla.org/en-US/firefox/addon/selenium-ide/)

Files to look at :

```
'test/selenium.js'
'test/Journey/selenium/test-runner.js'
```

Script to run the demo

```
npm run test:selenium
```
## Serving the test app

This serves the actual react app

```
npm run build
npm run serve (builds AND serve/watch)
```

## Deployment

This doc assumes you are on heroku with official nodejs buildpack.

Procfile to run custom web/workers etc. Default command is npm start.

Simply mirror any environment variables in heroku and it should behave as expected. This project fits nicely into heroku pipelines.

This app uses the heroku/nodejs official buildpack. Which allegedly should run npm test. but it doesn't. For now just put a postinstall script:

```
postinstall : "npm run test"
```

## Other supporting docs/examples

Not all of these are implemented in the test examples but might be useful one day  

- General Stubbing and testing  
http://brewhouse.io/2016/03/18/accelerate-your-react-testing-with-enzyme.html  
http://staxmanade.com/2015/11/testing-asyncronous-code-with-mochajs-and-es7-async-await/

- Async / Await es7  
https://github.com/lalitkapoor/node-pg-util/blob/master/src/test.js  

- Chai Promises 'eventually'  
http://chaijs.com/plugins/chai-as-promised/

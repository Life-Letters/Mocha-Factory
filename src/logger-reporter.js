/**
 * A reporter that logs to the logger-service.
 */
const mocha = require('mocha');

const logger = require('logger-client')({
  loggerUrl: process.env.CI_LOGGER_URL,
  appName: process.env.npm_package_name,
  appVersion: process.env.npm_package_version,
});

function JLReporter(runner) {
  mocha.reporters.Base.call(this, runner);

  var passes = 0;
  var failures = 0;

  runner.on('pass', function(test){
    passes++;
    logger.info('pass: '+test.fullTitle());
  });

  runner.on('fail', function(test, err){
    failures++;
    logger.warn('fail: '+test.fullTitle()+' ('+err.message+')');
  });

  runner.on('end', function(){
    logger.info('end: '+passes+'/'+(passes+failures));
    process.exit(failures);
  });
}

module.exports = JLReporter;
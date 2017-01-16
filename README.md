# Mocha Factory

#### What is this?

A module that builds a Mocha instance for running tests in Florey pipeline. Gives you Slack notifications and gets you ready for testing with Enzyme.

Please refer to the [example project]() to see how to use this.

#### Setup

Some environment variables are expected. Optional is marked with <OPTIONAL_...> else its required. For development make a '.env' file in root:

```
  NODE_ENV="local"
  SLACK_DEVELOPMENT_HOOK_URL="<OPTIONAL_URL>"
```

#### How to use

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

```

#### Notifications
If you have a slack URL in your env. It will post to slack else in console. If you fancy OSX notifications you can install the terminal notifier:

```
sudo gem install terminal-notifier
```

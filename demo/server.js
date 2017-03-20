'use strict';

require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 9201;

// Ensure that the JSON objects received from the client get parsed correctly.
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.get('/', function response(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

var server = app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

 module.exports = server;

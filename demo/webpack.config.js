var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders.js');

var BUILD_DIR = path.resolve(__dirname, 'public/build');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    devServer: {
      contentBase: './public',
      inline: true,
      stats: {
        chunks: false
      }
    },
    module : {
        loaders : loaders
    }
};

module.exports = config;

var webpack = require('webpack');

var config = {
  entry: './lib/mocha-factory.js',
  output: {
    path: 'dist',
    filename: 'mocha-factory.js',
    library: 'mocha-factory',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js']
  },
  externals: {
    "babel-register": 'babel-register',
    "dotenv" : 'dotenv',
    "require-hacker" : 'require-hacker',
    "css-modules-require-hook" : 'css-modules-require-hook',
    "node-sass" : 'node-sass',
    "jsdom" : 'jsdom',
    "fs" : 'fs',
    "path" : 'path',
    "mocha" : 'mocha'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;

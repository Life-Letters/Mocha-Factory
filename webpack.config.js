var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

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
  target: 'node',
  externals: [nodeExternals()],
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

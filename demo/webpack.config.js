/**
 * Webpack 2
 * https://webpack.js.org/configuration/
 */

const path        = require('path');
const rules       = require('./webpack.rules.js');
const webpack     = require('webpack');

const port = process.env.PORT || 9000;

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [path.resolve(__dirname, "node_modules"), "node_modules"], // Looks this node_modules first
    symlinks: false // Treat symlinks as if its not symlinked
  },
  entry: './src/index.js',
  output: {
    path: '/public',
    filename: 'bundle.js'
  },
  devtool: "cheap-eval-source-map",
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin()
    // TODO - Load .env plugin?
  ],
  module: {
    rules: rules
  },
  node: {
    fs: 'empty' // TODO - Remove once CSS loader sorts this out
  },
  devServer: {
    hot: true,
		stats: {
			chunks: false // Stops showing all the chunking info
		},
    host: '0.0.0.0',
		port: port, // Just a port
		historyApiFallback: true, // This is needed for nested routes
	}
}

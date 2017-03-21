module.exports = [
  {
    test: /\.jsx?$/,
    loader: "babel-loader"
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3|\.woff2|\.eot$/,
    loader: 'file-loader'
  },
  // Global css
  {
    test: /\.css$/,
    use: [
      'style-loader?sourceMap',
      'css-loader',
      'resolve-url-loader'
    ]
  },
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
      'resolve-url-loader',
      'sass-loader?sourceMap'
    ]
  }
];

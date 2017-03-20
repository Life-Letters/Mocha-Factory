module.exports = [
    {
        test : /\.jsx?/,
        exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
        loader : 'babel-loader'
    },
    {
      test: /\.(ttf|eot|woff2?|svg|wav)$/,
      loader: 'file'
    },
    {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
      loader: "file"
    },
    // Global css
    {
      test: /\.css$/,
      loaders: [
        'style-loader?sourceMap',
        'css-loader',
        'resolve-url-loader'
      ]
    },
    {
      test: /\.scss$/,
      exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
      loaders: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'resolve-url-loader',
        'sass-loader?sourceMap'
      ]
    },
    {
      test: /\.json$/,
      loader: 'json'
    }
]

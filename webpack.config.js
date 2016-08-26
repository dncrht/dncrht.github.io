var webpack = require('webpack');
var path = require('path');

var PUBLIC_DIR = path.resolve(__dirname, 'public');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports =
{
  entry: [
    PUBLIC_DIR + '/main.sass',
  ],
  output: {
    path: PUBLIC_DIR,
    filename: 'main.css'
  },
  module: {
    loaders: [
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css', {
      allChunks: true
    })
  ]
};

// 'use strict';

// var path              = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var autoprefixer      = require('autoprefixer');
// var webpack           = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
// 	devtool: 'eval',
//     entry: {
//         'main': path.join(__dirname, 'client', 'js', 'index.js'),
//         'style': path.join(__dirname, 'client', 'css', 'style.scss')
//     },
//     output: {
//         path: path.join(__dirname, 'client', 'build'),
//         filename: '[name].js',
//         publicPath: '/'
//     },
//     module: {
//         loaders: [
//             { test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/, plugins: ['transform-runtime']},
//             { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')},
//             { test: /\.css$/, loader: "style-loader!css-loader" },
//             { test: /\.html$/, loader: 'html-loader'},
//             { test: /\.png$/, loader: 'file' },
//       		{ test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file'}
//         ]
//     },
//     plugins: [
//         new ExtractTextPlugin('[name].css')
//     ],
//     postcss: function () {
//         return [autoprefixer];
//     }
// };


const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client',
    './client/index.js'
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },

   plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      { test: /\.js?$/,loader: 'babel',exclude: /node_modules/ },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!postcss-loader!sass-loader')},
      { test: /\.png$/, loader: 'file' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file'},
      { test: /\.html$/, loader: 'html-loader'},
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
}

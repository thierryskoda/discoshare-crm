var path              = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer      = require('autoprefixer');
var webpack           = require('webpack');

const OUTPUT_DIR = path.join(__dirname, 'client', 'build');

module.exports = {
    entry: {
        'main': path.join(__dirname, 'client', 'js', 'index.js'),
        'style': path.join(__dirname, 'client', 'css', 'style.scss')
    },
    output: {
        path: OUTPUT_DIR,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/, plugins: ['transform-runtime']},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')},
            {test: /\.css$/, loader: "style-loader!css-loader" },
            {test: /\.html$/, loader: 'html-loader'}
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    postcss: function () {
        return [autoprefixer];
    }
};

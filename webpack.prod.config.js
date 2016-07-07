// var Webpack = require('webpack');
// var path = require('path');
// var nodeModulesPath = path.resolve(__dirname, 'node_modules');
// var buildPath = path.resolve(__dirname, 'client', 'build');
// var mainPath = path.resolve(__dirname, 'client', 'js', 'index.js');

// const OUTPUT_DIR = path.join(__dirname, 'client', 'build');

// var config = {

// 	// We change to normal source mapping
// 	devtool: 'source-map',
// 	entry: {
//       'main': path.join(__dirname, 'client', 'js', 'index.js'),
//       'style': path.join(__dirname, 'client', 'css', 'style.scss')
//   },
//   output: {
//       path: OUTPUT_DIR,
//       filename: '[name].js'
//   },
// 	module: {
// 		loaders: [{
// 			test: /\.js$/,
// 			loader: 'babel',
// 			exclude: [nodeModulesPath]
// 		},{
// 			test: /\.css$/,
// 			loader: 'style!css'
// 		}]
// 	}
// };



// const path = require('path')
// const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// module.exports = {
//   devtool: 'source-map',

//   entry: [
//     path.join(__dirname, 'client', 'js', 'index.js')
//   ],

//   output: {
//     path: path.join(__dirname, 'build'),
//     filename: 'bundle.js',
//     publicPath: '/build/'
//   },

//   plugins: [
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.UglifyJsPlugin({
//       minimize: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.DefinePlugin({
//       'process.env': {
//         'NODE_ENV': JSON.stringify('production')
//       }
//     })
//   ],

//   module: {
//     loaders: [
//       { test: /\.js?$/,loader: 'babel',exclude: /node_modules/ },
//       { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!postcss-loader!sass-loader')},
//       { test: /\.png$/, loader: 'file' },
//       { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file'},
//       { test: /\.html$/, loader: 'html-loader'},
//       { test: /\.css$/, loader: "style-loader!css-loader" }
//     ]
//   }
// }



var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        './client/js/index.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'client'],
        extension: ['', '.js', '.scss']
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.html$/,
            loader: 'raw'
        },
        {
            test: /\.scss$/,
            loaders: [
                'style',
                'css',
                'autoprefixer?browsers=last 3 versions',
                'sass?outputStyle=expanded'
            ]
        },
        {
            test: /\.(woff2?|ttf|eot|svg)$/,
            loader: 'url?limit=10000'
        }
        ]
    }
};

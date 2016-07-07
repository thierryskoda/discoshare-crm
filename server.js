// /* eslint no-console: 0 */

// const path = require('path');
// const express = require('express');
// const webpack = require('webpack');
// const webpackMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// // const config = require('./webpack.config.js');

// const isDeveloping = process.env.NODE_ENV !== 'production';
// const port = isDeveloping ? 3000 : process.env.PORT;
// const app = express();

// if (isDeveloping) {
// 	console.log("We are in development");
//   	app.get('/*', function response(req, res) {
//   		// return res.sendFile(path.resolve(path.join(__dirname, 'client', 'index.html')));
//   		return res.sendFile(path.join(__dirname, 'client', 'index.html'));
//     	// res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'client', 'index.html')));
//     	// res.end();
//   	});
// } else {
//   	app.use(express.static(path.join(__dirname, 'client')));
//   	app.get('/*', function response(req, res) {
//     	res.sendFile(path.join(__dirname, 'build/index.html'));
//   	});
// }

// app.listen(port, function onStart(err) {
//   if (err) {console.log(err);}
//   console.info('Listening on port %s', port);
// });



// const path = require('path')
// const express = require('express')

// module.exports = {
//   app: function () {
//     const app = express()
//     const indexPath = path.join(__dirname, 'client','index.html')
//     const publicPath = express.static(path.join(__dirname, 'build'))

//     app.use('/build', publicPath)
//     app.get('/', function (_, res) { res.sendFile(indexPath) })

//     return app
//   }
// }



var express = require('express');
var app = express();
var path = require('path');

var PORT = process.env.PORT || 3000;

// Used for production build
app.use(express.static(path.join(__dirname, 'client')));

app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(PORT, function() {
    console.log('Server running on ' + PORT);
});

var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'eval-source-map',
	entry: {
		main: [
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/dev-server',
			'./src/main.js'
		]
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'public'),
		publicPath: '/public/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{ test: /\.(jsx|js)$/, include: path.join(__dirname, 'src'), loader: 'react-hot!babel' },
			{ test: /\.(scss)$/, include: path.join(__dirname, 'src'), loader: 'style!css!sass' }
		]
	}
};
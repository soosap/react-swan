var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var path = require('path');

var compiler = webpack({
	//devtool: 'eval-source-map',
	cache: false,
	entry: {
		main: [
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/dev-server',
			'./src/main.js'
		]
	},
	output: {
		filename: './public/[name].js',
		path: path.join(__dirname, 'public'),
		publicPath: '/public/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.(jsx|js)$/, include: path.join(__dirname, 'src'), loader: 'react-hot!babel'
			}
		]
	}
});

var server = new WebpackDevServer(compiler, {
	hot: true,
	historyApiFallback: true
});

server.listen(8080, 'localhost', function() {});
//server.close();
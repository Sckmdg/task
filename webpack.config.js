var path = require('path');

module.exports = {
	entry: './app/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
	  extensions: ['.js', '.jsx']
	},
	module:{
		loaders: [
		{  
			test: /\.jsx?$/,
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: {
				cacheDirectory: true,
				presets: ['react', 'es2015']
			}
		}
		]
	}
};
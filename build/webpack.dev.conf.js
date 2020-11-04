const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
	mode      : 'development',
	devtool   : 'cheap-module-eval-source-map',
	devServer : {
		overlay: {
			warnings : true,
			errors   : true,
		},
		port: 8081,
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
		}),
	],
});

module.exports = new Promise(resolve => resolve(devWebpackConfig));

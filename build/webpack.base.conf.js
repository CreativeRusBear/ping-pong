const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const mozjpeg = require('imagemin-mozjpeg');
const pngquant=require('imagemin-pngquant');
require('babel-polyfill');

const Paths ={
	src  : path.join(__dirname, '../src'),
	dist : path.join(__dirname, '../dist'),
};

module.exports={
	externals: {
		paths: Paths,
	},
	entry: {
		app: [ 'babel-polyfill', `${Paths.src}/js/index.js` ],
	},
	output: {
		filename   : 'index.js',
		path       : `${Paths.dist}/js/`,
		publicPath : '/dist/js',
	},
	module: {
		rules: [ {
			test    : /\.js$/,
			loader  : 'babel-loader',
			exclude : '/node_modules/',
		}, {
			test    : /\.(png|jpe?g|svg|gif)$/,
			loader  : 'file-loader',
			options : {
				name     : '[path][name].[ext]',
				emitFile : false,
			},
		}, {
			test : /\.css$/,
			use  : [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader  : 'css-loader',
					options : {
						sourceMap: true,
					},
				}, {
					loader  : 'postcss-loader',
					options : {
						sourceMap : true,
						config    : {path: `${Paths.src}/js/postcss.config.js`},
					},
				},
			],
		} ],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '../css/[name].css',
		}),
		new copyWebpackPlugin([
			{
				from : `${Paths.src}/img`,
				to   : `${Paths.dist}/img`,
			},
		]),
		new ImageminPlugin({
			interlaced  : true,
			progressive : true,
			svgPlugins  : [ {removeViewBox: false} ],
			plugins     : [
				mozjpeg({quality: 50}),
				pngquant(),
			],
		}),
	],
};

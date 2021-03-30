const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const htmlWebpackPlugin = require('html-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const paths = require('./paths');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: false,
    plugins: [
        new htmlWebpackPlugin({
            inject: 'body',
            minify: true,
            template: `${paths.src}/index.html`
        }),
        new BrotliPlugin({
          asset: '[file]',
          test: /\.(js|css|html)$/,
          threshold: 10240,
          minRatio: 0.8
      })
    ],
    optimization: {
        minimize: true,
        runtimeChunk: {
            name: 'single'
        }
    },
    performance: {
        hints: 'error',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
});

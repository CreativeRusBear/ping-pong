let path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

let conf = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: 'app.js',
        publicPath: '/dist/js'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../css/style.css'),
    ]
};

module.exports = (env, options)=>{
    let prod = options.mode==='production';
    conf.devtool = prod ? 'source-map' : 'eval-sourcemap';
    return conf;
};

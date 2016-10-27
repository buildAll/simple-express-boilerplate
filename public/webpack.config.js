// basic varibles
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// for compile different files for specific usage
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;

// config in package.json
const pkg = require('../package.json');

// 3rd party plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


// postcss
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const postcssImport = require('postcss-import');

// project path config
const PATHS = {
    home: path.join(__dirname, '/js/home/'),
    build: path.join(__dirname, '/dist'),
    images: path.join(__dirname, '/dist/images'),
    style: path.join(__dirname, 'css')
};

// common config for webpack
const common = {
    entry: {
        home: PATHS.home
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    publicPath: PATHS.build,
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
        }
    ],
    resolve: {
        alias: {
            css: path.resolve(__dirname, 'css'),
            plugin: path.resolve(__dirname, 'js/plugin')
        }
    }
}

// config for the development phase
if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            historyApiFailback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: 8080,
            contentBase: path.resolve(__dirname)
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loaders: ['style', 'css', 'postcss']
                },
                {
                    test: /\.jpg|png|jpeg/,
                    loader: 'url?limit=25000'
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        postcss: function(webpack) {
            return [
                postcssImport({addDependencyTo: webpack}),
                precss,
                autoprefixer
            ];
        }
    });
}

// config for the production phase
if (TARGET === 'build') {
    module.exports = merge(common, {
        entry: {
            vendor: ['jquery', 'swiper']
        },
        output: {
            path: PATHS.build,
            filename: '[name].[chunkhash].js',
            chunkFilename: '[chunkhash].js'
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', 'css!postcss'),
                },
                {
                    test: /\.jpg|png|jpeg/,
                    loader: 'url?limit=25000'
                }
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest']
            }),
            new ExtractTextPlugin('[name].[chunkhash].css'),
            new CleanWebpackPlugin([PATHS.build])
        ],
        postcss: function(webpack) {
            return [
                postcssImport({addDependencyTo: webpack}),
                precss,
                autoprefixer
            ];
        }
    });
}

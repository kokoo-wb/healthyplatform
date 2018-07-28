const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const webpack = require('webpack')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

const autoprefixer = require('autoprefixer')

const config = merge(base, {
    entry: {
        main: ['webpack-hot-middleware/client?reload=true', 'babel-polyfill', path.resolve(__dirname, '..', './src/app')]
    },
    output: {
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader?cacheDirectory=true'
                },
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]-[hash:base64:5]'
                        }
                    },
                    'postcss-loader'
                ],
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
                include: path.join(__dirname, '../node_modules')
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ],
                include: path.join(__dirname, '../node_modules')
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]-[hash:base64:5]'
                        }
                    },
                    'less-loader',
                    'postcss-loader'
                ],
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.(jpe?g|png|ico|gif|woff|woff2|eot|ttf|svg|swf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4000,
                            name: 'images/[name][hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return (
                    /node_modules/.test(module.context) &&
                    !/\.css$/.test(module.request)
                )
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor'],
            minChunks: Infinity
        }),

        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dll/vendor-manifest.json')
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [autoprefixer],
            }
        })
    ],

    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css', '.less'], // resolve 指定可以被 import 的文件后缀
        alias: {
        } // 指定包路径，这样能够减少webpack搜索硬盘文件的时间
    }
})

module.exports = config

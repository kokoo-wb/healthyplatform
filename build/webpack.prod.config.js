const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const webpack = require('webpack')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const config = merge(base, {
    devtool: 'cheap-source-map',
    entry: {
        main: './src/app',
    },

    output: {
        publicPath: '/',
        filename: 'js/[name].[hash:8].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]-[hash:base64:5]',
                                importLoaders: 1
                            }
                        },
                        'postcss-loader'
                    ]
                }),
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                }),
                include: path.join(__dirname, '../node_modules')
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]-[hash:base64:5]',
                                importLoaders: 1
                            }
                        },
                        'less-loader'
                    ]
                }),
                include: path.join(__dirname, '../src')
            },

            {
                test: /\.(jpe?g|png|gif|ico|woff|woff2|eot|ttf|svg|swf)$/,
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
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        new webpack.optimize.UglifyJsPlugin({
            // 需要在LoaderOptionsPlugin中匹配minize
            sourceMap: false,
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告  
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            },
        }),

        new ExtractTextPlugin('css/[name]_[hash:8].css'),

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

        new HtmlWebpackPlugin({
            title: 'index',
            template: path.join(__dirname, '../src/templates/index.template.html'),
            filename: 'index.html',
            inject: 'body',
            chunksSortMode: 'dependency'
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

const LoaderOptions = [
    new webpack.LoaderOptionsPlugin({
        options: {
            context: __dirname,
            postcss: [autoprefixer],
            sourceMap: true,
            minimize: true
        }
    })
];

LoaderOptions.map(item => {
    config.plugins.push(item)
    return undefined
})

module.exports = config

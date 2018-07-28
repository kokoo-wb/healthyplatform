const path = require('path')
const webpack = require('webpack')
const FreiendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    devtool: isProd
        ? 'source-map'
        : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[hash:8].js',
        chunkFilename: 'chunks/[name][hash:8].chunk.js' // 按需加载配置
    },
    resolve: {
        alias: {
            public: path.resolve(__dirname, '../src/statics'),
            iComponents: path.resolve(__dirname, '../src/components'),
            iConstants: path.resolve(__dirname, '../src/constants'),
        }
    },
    externals: {
        'source-map': 'window.sourceMap'
    },
    module: {
        noParse: /es6-promise\.js$/

    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    plugins: isProd
        ? []
        : [
            new FreiendlyErrorsPlugin()
        ]
}

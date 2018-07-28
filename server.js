const path = require('path')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')

const webpack = require('webpack')
const webpackDevMiddleWare = require('webpack-dev-middleware')
const webpackHotMiddleWare = require('webpack-hot-middleware')

const clientConfig = require('./build/webpack.config')

function setupDevServer(app) {
    // modify client config to work with hot middleware
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    // dev middleware
    const clientCompiler = webpack(clientConfig)
    const devMiddleware = webpackDevMiddleWare(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true
    })
    app.use(devMiddleware)
    clientCompiler.plugin('done', stats => {
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (stats.errors.length) {
            return false
        }
    })

    // hot middleware
    app.use(webpackHotMiddleWare(clientCompiler, { heartbeat: 5000 }))

    return app
}

const isProd = process.env.NODE_ENV === 'production'

const resolve = file => path.resolve(__dirname, file)
const server = (thePath) => express.static(resolve(thePath), {
    maxAge: 0
})

let app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression({ threshold: 0 }))
app.use('/dist', server('./dist', true))

if (!isProd) {
    app = setupDevServer(app)
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './src/index.html'))
})

const port = process.env.PORT || 4999

app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})

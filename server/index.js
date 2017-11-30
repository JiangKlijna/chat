// npm run server
require('../build/check-versions')()

const config = require('./config.js')

const express = require('express')
let app = express()

// cookie sesstion
const cookieParser = require('cookie-parser')
const session = require('cookie-session')
app.use(cookieParser())
app.use(session({
    resave: false,
    secret: 'jiangKlijna',
    saveUninitialized: true
}))

// serve pure static assets
app.use('/', express.static(config.assetsPublicPath));

// set restful api
require('./routes.js')(app)

// default port where dev server listens for incoming traffic
const uri = 'http://localhost:' + config.port
console.log('> Listening at ' + uri + '\n')
require('opn')(uri)
let server = app.listen(config.port)

// set socket.io
require('./socket.js')(server)

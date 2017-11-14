// npm run server
require('../build/check-versions')()

const config = require('config.js')

const express = require('express')
const app = express()

// serve pure static assets
app.use('/', express.static(config.assetsPublicPath));

// default port where dev server listens for incoming traffic
const port = config.port
var uri = 'http://localhost:' + port
console.log('> Listening at ' + uri + '\n')
require('opn')(uri)
app.listen(port)

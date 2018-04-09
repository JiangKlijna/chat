// npm run server
require('../build/check-versions')()

const config = require('./config.js')

const express = require('express')
let app = express()

// cookie sesstion
app.use(require('cookie-parser')())
app.use(require('cookie-session')(config.session))
// post body
app.use(require('body-parser').json());

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
require('./socket.js').init(server)

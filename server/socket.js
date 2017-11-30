
// socket.io

let message = function (obj) {

}

module.exports = function (server) {
    let io = require('socket.io')(server);
    io.on('connection', function (socket) {
        socket.on(message.name, message)
    })
}

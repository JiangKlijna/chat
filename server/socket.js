
// socket.io
let sktio = require('socket.io');
let io = null;

const TAG = "message";

let message = function (msg) {
    console.log(msg);
    io.emit(TAG, msg);
}

module.exports = function (server) {
    io = sktio(server);
    io.on('connection', function (socket) {
        socket.on(TAG, message)
    })
}

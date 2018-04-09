
// socket.io
let sktio = require('socket.io');
let io = null;
let skt = null;

const TAG = "message";

// 初始化模块
let init = function (server) {
    io = sktio(server);
    io.on('connection', function (socket) {
        skt = socket;
        socket.on(TAG, message);
        console.log(skt);
    })
};

// 收到从fromUser到toUser的信息
// 先把数据保存到数据库，再把消息发出去
let message = function (msg) {
  console.log(msg);
  io.emit(TAG, msg);
};

// 监听此用户的频道，并且不关闭
let on = (userid) => skt.on(userid, message);

module.exports = {init, on};

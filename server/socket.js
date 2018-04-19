
// socket.io
let io = null;

// 收到从fromUser到toUser的信息
// 先把数据保存到数据库，再把消息发出去
let message = function (msg) {
    io.emit(msg.toUserid, msg.message);
};

//拿到socket对象, 并监听所有用户的频道,而且不关闭
let init = function (skt) {
    skt.on(userid, message);
};

// 初始化模块
module.exports = server => {
    io = require('socket.io')(server);
    io.on('connection', init);
};

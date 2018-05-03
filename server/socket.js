
// socket.io
const {us, cs} = require("./methods.js")
let io = null;

// 这里message接受所有用户发来的消息
// 收到从fromUser到toUser的信息
// 先把数据保存到数据库，再把消息发出去
let message = async msg => {
    try {
        var m = await cs.record(msg.fromUserid, msg.toUserid, msg.message);
        io.emit(msg.toUserid, m);
        io.emit(msg.fromUserid, m);
    } catch (e) {
        console.log(e);
    }
};

//拿到socket对象, 并监听message的频道
let init = skt => skt.on(message.name, message);

// 初始化模块
module.exports = server => {
    io = require('socket.io')(server);
    io.on('connection', init);
};

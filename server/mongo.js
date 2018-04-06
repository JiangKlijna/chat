// dao
// mongoose model

// config
const config = require('./config.js');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl, {useMongoClient:true});

//connect success
mongoose.connection.on('connected', () => console.log('Mongoose connection open to ' + config.mongoUrl));
//connect error
mongoose.connection.on('error', err => console.log('Mongoose connection error: ' + err));
//disconnected
mongoose.connection.on('disconnected', () => console.log('Mongoose connection disconnected'));

// userid increase
const Userid_id = "jiangKlijna"
let UseridSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 1}
});
let Userid = mongoose.model('Userid', UseridSchema);
// 如果ui已经存在， 不存在则创建一个
Userid.findById(Userid_id, function (err, ui) {
    if (err) return console.log(err);
    if (ui) return;
    let u = new Userid({_id: Userid_id, seq: 1});
    u.save();
});

// User
let UserSchema = new mongoose.Schema({
    userid: {type: Number, index: {unique: true}},
    username: String,
    password: String,
    add_time: Date
});
// save前设置自增id
UserSchema.pre('save', function(next) {
    let u = this;
    Userid.findByIdAndUpdate({_id: Userid_id}, {$inc: {seq: 1}}, function(err, counter) {
        if(err || counter === null) return next(err);
        u.userid = counter.seq;
        next();
    });
});

// Chat Message
let MessageSchema = new mongoose.Schema({
    toUserid: Number,
    fromUserid: Number,
    time: Date,
    content: String
});

let User = mongoose.model('User', UserSchema);
let Message = mongoose.model('User', MessageSchema);
module.exports = {User, Message};

// test
if(module === require.main) {
    let u = new User({username: "cj", password: "123", add_time:new Date()});
    u.save(function (err) {
        if(err) console.log(err)
    });
    console.log(u);
}

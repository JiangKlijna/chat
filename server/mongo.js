
// config
const config = require('./config.js');

// mongoose model
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl, {useMongoClient:true});

// userid increase
const Userid_id = "jiangKlijna"
let UseridSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 1}
});
let Userid = mongoose.model('Userid', UseridSchema);
// 如果ui已经存在， 不存在则创建一个
Userid.findById(Userid_id, function (err, ui) {
    console.log("19", err, ui);
    if (err) return console.log(err);
    if (ui) return;
    new Userid({_id: Userid_id}).save();
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
        console.log("36", err, counter);
        if(err) return next(err);
        u.userid = counter.seq;
        next();
    });
});

module.exports = {
    User: mongoose.model('User', UserSchema),
};

// test
if(module === require.main) {
    let User = mongoose.model('User', UserSchema);
    let u = new User({userid: 3, username: "cj2", password: "123", add_time:new Date()});
    u.save(function (err) {
        if(err) console.log(err)
    });
    // console.log(u)
    //mongoose.disconnect(m => console.log(m));
}

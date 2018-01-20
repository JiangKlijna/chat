
// config
const config = require('./config.js');

// mongoose model
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl, {useMongoClient:true});

// User
let UserSchema = new mongoose.Schema({
    userid: {type: Number, index: {unique: true}},
    username: String,
    password: String,
    add_time: Date
});

module.exports = {
    User: mongoose.model('User', UserSchema),
}

// test
if(module === require.main) {
    let u = new module.exports.User({userid: 1, username: "cj", password: "123", add_time:new Date()});
    u.save(function (err, User) {
      console.log(User)
      if (err) return console.error(err);
    });
    console.log(u)
    //mongoose.disconnect(m => console.log(m));
}


// mongoose model
let mongoose = require('mongoose');

// User
let UserSchema = new mongoose.Schema({
    username: {type: String, index: {unique: true}},
    password: String,
});

module.exports = {
    User: mongoose.model('User', UserSchema),
}

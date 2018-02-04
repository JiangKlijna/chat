
// service
// mongo Schema methods

let {User} = require('./mongo');

// user service
const userService = {
    regist: (username, password) => new Promise((resolve, reject) => {
        let u = new User({username: username, password: password, add_time:new Date()});
        User.save(u, function (err) {
            if(err) reject(err);
            else resolve(u);
        })
    }),
}

module.exports = {
    us: userService
};

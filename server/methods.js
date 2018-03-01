
// service
// mongo Schema methods

let {User} = require('./mongo');

// user service
const userService = {
    /**
     * 验证用户密码
     * @param userid
     * @param password
     * @returns {Promise<any>}
     */
    verification: (userid, password) => new Promise((resolve, reject) => {
        let u = new User({userid: userid, password: password});

    }),
    /**
     * 注册
     * @param username
     * @param password
     * @returns {Promise<User>}
     */
    regist: (username, password) => new Promise((resolve, reject) => {
        let u = new User({username: username, password: password, add_time:new Date()});
        u.save(function (err) {
            if(err) reject(err);
            else resolve(u);
        })
    }),
}

module.exports = {
    us: userService
};

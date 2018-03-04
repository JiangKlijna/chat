// service
// mongo Schema methods

let {User} = require('./mongo');

// user service
const userService = {
    /**
     * 验证用户密码
     * @param userid
     * @param password
     * @returns {Promise<User>}
     */
    verification: (userid, password) => new Promise((resolve, reject) => {
        User.findOne({userid:userid}, (err, u) => {
            if(err) return reject(err);
            resolve(u.password === password ? u : null);
        })
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

// test
if(module === require.main) {
    (async () => {
        let u = await userService.verification('1', '123');
        console.log("await", u)
    })()
}

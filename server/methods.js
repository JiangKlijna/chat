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
        User.findOne({userid}, (err, u) => {
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
        let u = new User({username, password, add_time:new Date()});
        u.save(function (err) {
            if(err) reject(err);
            else resolve({username, userid: u.userid});
        })
    }),
    /**
     * 搜索用户
     * @param userobj
     * @returns {Promise<User>}
     */
    search: (userobj) => new Promise((resolve, reject) => {
        User.find(userobj, '-__v -_id -add_time -password', (err, u) => {
            if(err) reject(err);
            else resolve(u);
        })
    }),
    /**
     * 修改用户信息
     * @param userobj
     * @returns {Promise<any>}
     */
    update: (userid, userobj) => new Promise((resolve, reject) => {
        User.update({userid}, userobj, (err, u) => {
            if(err) reject(err);
            else resolve(u);
        });
    }),
}

module.exports = {
    us: userService
};

// test
if(module === require.main) {
    (async () => {
        let u = await userService.verification('1', 'update');
        console.log("await", u)
        let r = await userService.update(1, {username: 'update'});
        console.log("await", r)
    })()
}

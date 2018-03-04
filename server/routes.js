// control
// restful api

const {us} = require("./methods.js")

// generator function
const gen = (method, path, fun) => {
    fun.setting = app => eval(`app.${method}('${path}', fun)`);
    return fun;
};

// parameters object
const Params = {
    illegal: {code: 1, msg: 'Illegal parameters'},
    get: (req, key) => req.body[key] || req.query[key],
    test() {
        for (let p of arguments) if (!p) return false;
        return true;
    },
    failure: (msg) => ({code: 1, msg: msg}),
    success: (obj) => ({code: 0, obj: obj}),
};

// routes
const routes = [
    /**
     * 登陆
     * userid 用户ID
     * password 用户密码
     */
    gen('post', '/user/sign/in', async (req, res) => {
        let userid = Params.get(req, 'userid');
        let password = Params.get(req, 'password');
        if (!Params.test(userid, password)) return res.json(Params.illegal);
        try {
            let u = await us.verification(userid, password);
            if (u) req.session.user = u;
            res.json(Params.success(u !== null));
        } catch (e) {
            res.json(Params.failure(e));
        }
    }),
    /**
     * 注册
     * username 用户名(可修改)
     * password 用户密码(明文)
     */
    gen('post', '/user/sign/up', async (req, res) => {
        let username = Params.get(req, 'username');
        let password = Params.get(req, 'password');
        if (!Params.test(username, password)) return res.json(Params.illegal);
        try {
            let u = await us.regist(username, password);
            res.json(Params.success(u));
        } catch (e) {
            res.json(Params.failure(e));
        }
    }),
    /**
     * 判断是否登陆，返回以登陆的用户信息
     */
    gen('post', '/user/login/is', async (req, res) => {
        res.json(Params.success(req.session.user.info()));
    }),
    // 搜索
    gen('post', '/user/search', function (req, res) {
        res.send('search')
    }),
    // 修改一个用户信息，只有自己才能修改
    gen('post', '/user/update', function (req, res) {
        res.send('update')
    }),
    // 获得一个用户的详细信息
    gen('post', '/user/info', function (req, res) {
        res.send('info')
    }),
    // 获得消息列表
    gen('post', '/message/list', function (req, res) {
        res.send('list')
    }),
    // 删除一个会话的所有消息
    gen('post', '/message/delete', function (req, res) {
        res.send('delete')
    }),
]

module.exports = app => {
  for (let r of routes) r.setting(app)
};


// restful api

// generator
const gen = function (method, path, fun) {
    fun.setting = app => eval(`app.${method}('${path}', fun)`);
    return fun;
}

// routes
const routes = [
    // 登陆
    gen('post', '/user/sign/in', function (req, res) {
        res.send('signin')
    }),
    // 注册
    gen('post', '/user/sign/up', function (req, res) {
        res.send('signup')
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

module.exports = app => {for (var r of routes) r.setting(app)};

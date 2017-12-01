
// restful api

// generator
const gen = function (method, path, fun) {
    fun.setting = app => eval(`app.${method}('${path}', fun)`);
    return fun;
}

const routes = [
    gen('get', '/test', function (req, res) {
        res.send('test')
    }),
]

module.exports = app => {for (var r of routes) r.setting(app)};

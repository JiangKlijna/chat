// 头像url缓存
window.Avatar_Cache = [];
// util
window.util = {
    random_choose: function (arr) {
        return arr[parseInt(Math.random()*arr.length)];
    },
    toUpperTitle: function (str) {
        if (str.indexOf('-') >= 0) {
            var arr = str.split('-');
            for (var i in arr) {
                arr[i] = this.toUpperTitle(arr[i]) + ' ';
            }
            return arr.join('');
        } else {
            return str.substring(0, 1).toUpperCase() + str.substring(1);
        }
    },
    mdAvatar: function (size, text) {
        var url = Avatar_Cache[text[0]];
        if (url) return url;
        var url = new mdAvatar({
            size: size,
            text: text,
            fontFamily: 'consolas'
        }).toDataURL();
        Avatar_Cache[text[0]] = url;
        return url;
    },
    test_params: function () {
         for (var i in arguments) {
            var p = arguments[i];
            if (!p) return false;
         }
         return true;
    },
    dialog: {
        base: function (content, title, handle, confirmText) {
            location.hash += '#';
            mdui.alert(content, title, handle, {confirmText: confirmText});
        },
        error: function (content) {
            this.base(content, R.Str.ERROR, null, '确 定');
        },
        info: function (content) {
            this.base(content, R.Str.INFO, null, '确 定');
        }
    },
    Router: {
        mListen: null,
        pListen: null,
        prePath: '/',
        curPath: '',
        regist: function ($router, cb) {
            this.mListen = cb;
            if (this.pListen) return;
            var self = this;
            self.pListen = function (to, from, next) {
                self.curPath = to.path;
                self.prePath = from.path;
                if (self.mListen) self.mListen(to, from, next)
            };
            $router.beforeEach(self.pListen);
        }
    },
    Socket: new (function() {
        var skt = null;
        var cb = null;
        this.open = function (userid) {
            if (skt) return;
            skt = io();
            skt.on(userid, function (msg) {
                if (cb) cb(msg);
            })
        };
        this.close = function () {
            if (!skt) return;
            skt.close();
            skt = null;
        };
        this.commit = function (toUserid, msg) {
            if (!skt) return;
            skt.emit(toUserid, msg);
        };
        this.add = function (callback) {
            cb = callback;
        }
    })()
};

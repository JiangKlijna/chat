<template>
    <div id="app" v-bind:class="app_class">
        <div id="main" v-bind:style="main_style">
            <router-view class="app_body"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data: function () {
        return {
            user: null,
            accent_color: null,
            primary_color: null,
            main_style: {
                'width': '800px',
                'height': '800px',
                'margin-top': '60px',
            }
        }
    },
    methods: {
        onResize: function () {
            if (window.innerWidth < 800) { // 调整为移动端样式
                this.main_style['margin-top'] = 0;
                this.main_style.width = '100%';
                this.main_style.height = '100%';
            } else { // 调整为pc端样式
                let marginTop = parseInt((window.innerWidth-800) / (window.screen.width-800) * 60);
                this.main_style['margin-top'] = marginTop + 'px';
                this.main_style.height = (window.innerHeight - marginTop * 2) + 'px';
                this.main_style.width = '800px';
            }
        },
        onIsLogin: function () {
            var self = this;
            axios.post(R.URL.ISLOGIN_URL).then(function (obj) {
                if (obj.data.code !== 0) return util.dialog.error(R.Str.ERROR_NETWORK);
                if (obj.data.obj == null) self.$router.push('login');
                else {
                    self.user = obj.data.obj;
                    if (window.kid) window.kid.onUserCallBack();
                }
            })
        },
        onLogout: function () {
            var self = this;
            axios.post(R.URL.LOGOUT_URL).then(function (obj) {
                self.user = null;
                self.$router.push('login');
            })
        }
    },
    watch: {
        user: function (u) {
            if (u) { // 登陆之后获得当前用户数据 触发
                util.Socket.open(u.userid);
            } else { // 注销之后去除当前用户数据 触发
                util.Socket.close();
            }
        }
    },
    computed: {
        app_class: function () {
            return 'mdui-theme-primary-' + this.primary_color + ' mdui-theme-accent-' + this.accent_color;
        }
    },
    mounted: function () {
        this.onIsLogin();
        window.app = this;
        window.onresize = this.onResize;
        window.onresize();
        // 随机选择一个color
        this.primary_color = window.util.random_choose(window.R.primary_colors);
        this.accent_color = window.util.random_choose(window.R.accent_colors);
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    font-family: consolas;
}
html, body, #app, .hundred {
    width: 100%;
    height: 100%;
}
#app {
  text-align: center;
  background-color: #f1f1f1;
}
#main {
    margin: 0 auto;
    border-radius: 6px;
    background-color: white;
    box-shadow: 0 0 8px rgba(0,0,0,.3);
    vertical-align: middle;
    display: inline-block;
    overflow-y: auto;
    overflow-x: hidden;
}
#main .app_body {
    height: 100%;
}
</style>

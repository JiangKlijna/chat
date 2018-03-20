<template>
    <div id="regist">
        <ToolBar title="注册"/>
        <div id="regist_body">
            <br>
            <div class="mdui-textfield mdui-textfield-floating-label">
                <i class="mdui-icon material-icons">face</i>
                <label class="mdui-textfield-label">昵称:</label>
                <input class="mdui-textfield-input" v-model:value="username" required/>
                <div class="mdui-textfield-error">昵称不能为空</div>
            </div>
            <br>
            <div class="mdui-textfield mdui-textfield-floating-label">
                <i class="mdui-icon material-icons">lock</i>
                <label class="mdui-textfield-label">密码:</label>
                <input class="mdui-textfield-input" v-model:value="password" type="password" required/>
                <div class="mdui-textfield-error">密码不能为空</div>
            </div>
            <br><br>
            <div class="mdui-row">
                <div class="mdui-col-xs-6">
                    <button class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple mdui-shadow-8" v-on:click="onClickRegist">注 册</button>
                </div>
                <div class="mdui-col-xs-6">
                    <button class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple mdui-shadow-8" v-on:click="onClickLogin">登 陆</button>
                </div>
            </div>
        </div>
        <br><br>
        <div id="regist_show" class="mdui-card mdui-ripple" v-show="username !== ''">
            <p><img v-bind:src="imgurl"/></p><br>
            <p class="regist_title">{{username}}</p>
        </div>
    </div>
</template>

<script>
import ToolBar from './ToolBar'
export default {
    name: 'Regist',
    components: {ToolBar},
    data () {
        return {
            imgurl: null,
            username: '',
            password: ''
        }
    },
    watch: {
        username: function (n, o) {
            this.username = n.trim();
            if (this.username !== n) return;
            if (n === '') {
                this.imgurl = null;
                return;
            }
            if (n.length >= 10) {
                this.username = o;
                return;
            }
            if (n[0] === o[0]) return;
            this.imgurl = util.mdAvatar(80, n);
        }
    },
    methods: {
        onClickRegist: function () {
            if (!util.test_params(this.username, this.password)) return;
            var self = this;
            axios.post(R.URL.REQIST_URL, {username: this.username, password: this.password}).then(function (obj) {
                if (obj.data.code !== 0) return util.dialog.error(R.Str.ERROR_NETWORK);
                var u = obj.data.obj;
                util.dialog.base("User ID : " + u.userid, "注册成功", self.onClickLogin, '确定');
            })
        },
        onClickLogin: function () {
            this.$router.push('login');
        }
    },
    mounted: function () {
        // 已经登陆则返回
        if (app.user !== null) this.$router.back();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #regist_body {
        text-align: left;
    }
    #regist_show {
        width: 50%;
        margin: 0 auto;
    }
    .regist_title {
        font-size: 22px;
        font-weight: 700;
    }
</style>

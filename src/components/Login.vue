<template>
    <div id="login">
        <ToolBar title="登陆"/>
        <div id="login_body">
            <br>
            <div class="mdui-textfield mdui-textfield-floating-label">
                <i class="mdui-icon material-icons">account_circle</i>
                <label class="mdui-textfield-label">账号:</label>
                <input class="mdui-textfield-input" v-model:value="userid" required/>
                <div class="mdui-textfield-error">id不能为空</div>
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
                    <button class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple mdui-shadow-8" v-on:click="onClickLogin">登 陆</button>
                </div>
                <div class="mdui-col-xs-6">
                    <button class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple mdui-shadow-8" v-on:click="onClickRegist">注 册</button>
                </div>
            </div>
          </div>
        <br><br>
        <div id="login_show" class="mdui-card mdui-ripple" v-show="username !== ''">
            <p><img v-bind:src="imgurl"/></p><br>
            <p class="login_title">{{username}}</p>
        </div>
    </div>
</template>

<script>
import ToolBar from './ToolBar'
export default {
    name: 'Login',
    components: {ToolBar},
    data () {
        return {
            imgurl: null,
            username: '',
            userid: '',
            password: ''
        }
    },
    watch: {
        userid: function (n) {
            if (n === '' || isNaN(n)) {
                this.username = null;
                return;
            }
            var self = this;
            // search by userid
            axios.post(R.URL.SEARCH_URL, {userid: n}).then(function (obj) {
                if (obj.data.code !== 0) return util.dialog.error(R.Str.ERROR_NETWORK);
                self.username = obj.data.obj[0].username;
            })
        },
        username: function (n, o) {
            if (n === null || n === '') {
                this.imgurl = null;
                return;
            }
            // if (n[0] === o[0]) return;
            this.imgurl = util.mdAvatar(80, n);
        }
    },
    methods: {
        onClickLogin() {
            if (!util.test_params(this.userid, this.password)) return;
            var self = this;
            axios.post(R.URL.LOGIN_URL, {userid: this.userid, password: this.password}).then(function (obj) {
                if (obj.data.code !== 0) return util.dialog.error(R.Str.ERROR_NETWORK);
                if (!obj.data.obj) return util.dialog.error(R.Str.ERROR);
                app.user = obj.data.obj;
                self.$router.push('person');
            })
        },
        onClickRegist() {
            this.$router.push('regist');
        }
    },
    mounted: function () {
        // 已经登陆则返回
        if (app.user !== null) this.$router.push('person');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #login_body {
       text-align: left;
    }
    #login_show {
        width: 50%;
        margin: 0 auto;
    }
    .login_title {
        font-size: 22px;
        font-weight: 700;
    }
</style>

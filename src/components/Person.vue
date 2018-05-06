<template xmlns:v-model="http://www.w3.org/1999/xhtml">
    <div id="person">
        <ToolBar title="我的"/>
        <div id="person_body">
            <div id="person_show" class="mdui-card mdui-ripple">
                <p><img v-bind:src="imgurl"/></p><br>
                <p class="person_title">{{username}}</p><br>
                <button class="mdui-btn mdui-btn-icon" v-on:click="changePassword()" mdui-tooltip="{content: '修改密码'}">
                    <i class="mdui-icon material-icons">vpn_key</i>
                </button>
                <button class="mdui-btn mdui-btn-icon" v-on:click="changeUsername()" mdui-tooltip="{content: '修改昵称'}">
                    <i class="mdui-icon material-icons">account_circle</i>
                </button>
                <button class="mdui-btn mdui-btn-icon" v-on:click="logout()" mdui-tooltip="{content: '注销'}">
                    <i class="mdui-icon material-icons">all_out</i>
                </button>
            </div>
            <div id="person_input_dialog" class="mdui-dialog" ref="input_dialog">
                <div class="mdui-dialog-title">{{dialog_title}}</div>
                <div class="mdui-dialog-content">
                    <div class="mdui-textfield mdui-textfield-floating-label">
                        <i class="mdui-icon material-icons">{{dialog_icons}}</i>
                        <label class="mdui-textfield-label">{{dialog_label}}</label>
                        <input class="mdui-textfield-input" v-bind:type="dialog_type" v-model:value="dialog_value" required/>
                        <div class="mdui-textfield-error">不能为空</div>
                    </div>
                </div>
                <div class="mdui-dialog-actions">
                    <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
                    <button class="mdui-btn mdui-ripple" mdui-dialog-confirm v-on:click="onChange()">修改</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ToolBar from './ToolBar'
export default {
    name: 'Person',
    components: {ToolBar},
    data () {
        return {
            imgurl: null,
            username: null,
            dialog: null,
            dialog_title: '',
            dialog_icons: '',
            dialog_label: '',
            dialog_value: '',
            dialog_type: '',
        }
    },
    methods: {
        openDialog: function (title, icons, label, value, type) {
            location.hash += '#';
            this.dialog_title = title;
            this.dialog_icons = icons;
            this.dialog_label = label;
            this.dialog_value = value;
            this.dialog_type = type;
            this.dialog.open();
        },
        // 修改密码
        changePassword: function () {
            this.openDialog('修改密码', 'vpn_key', '密码', '', 'password');
        },
        // 修改昵称
        changeUsername: function () {
            this.openDialog('修改昵称', 'account_circle', '昵称', '', 'text');
        },
        // 注销
        logout: function () {
            app.onLogout();
        },
        // 当dialog确定时
        onChange: function () {
            var uobj = this.dialog_type === 'text' ? {username: this.dialog_value} : {password: this.dialog_value};
            var self = this;
            axios.post(R.URL.UPDATE_URL, uobj).then(function (obj) {
                if (obj.data.code !== 0) return util.dialog.error(R.Str.ERROR_NETWORK);
                if (self.dialog_type === 'text') self.username = self.dialog_value;
                util.dialog.info("修改成功!");
            });
        },
        onUserCallBack: function () {
            this.username = app.user.username;
            this.imgurl = util.mdAvatar(80, this.username);
        }
    },
    mounted: function () {
        // 如果未登陆则跳转到login
        if (app.user === null) return this.$router.push('/login');
        this.dialog = new mdui.Dialog(this.$refs.input_dialog);
        window.kid = this;
    },
    beforeDestroy: function () {
        window.kid = null;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #person_body {
        height: 50%;
        min-height: 200px;
        width: 50%;
        margin: 0 auto;
        position: relative;
    }
    #person_show {
        width: 100%;
        bottom: 0;
        position: absolute;
    }
    .person_title {
        font-size: 22px;
        font-weight: 700;
    }
    #person_input_dialog {
        text-align: left;
    }
</style>

<template>
    <div id="regist">
        <ToolBar title="注册"/>
        <div id="regist_body">
            <br>
            <div class="mdui-textfield mdui-textfield-floating-label">
                <i class="mdui-icon material-icons">face</i>
                <label class="mdui-textfield-label">昵称:</label>
                <input class="mdui-textfield-input" v-model:value="username"/>
            </div>
            <br>
            <div class="mdui-textfield mdui-textfield-floating-label">
                <i class="mdui-icon material-icons">lock</i>
                <label class="mdui-textfield-label">密码:</label>
                <input class="mdui-textfield-input" v-model:value="password" type="password"/>
            </div>
            <br><br>
            <button class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple mdui-shadow-8" v-on:click="onClickLogin">登 陆</button>
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
            this.imgurl = util.mdAvatar(80, n).toDataURL();
        }
    },
    methods: {
        onClickLogin: function () {
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #regist_body {
        text-align: left;
    }
    .mdui-card {
        width: 50%;
        margin: 0 auto;
    }
    .regist_title {
        font-size: 22px;
        font-weight: 700;
    }
</style>

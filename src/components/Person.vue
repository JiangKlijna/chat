<template>
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
            username: null
        }
    },
    methods: {
        // 修改密码
        changePassword: function () {
        },
        // 修改昵称
        changeUsername: function () {
        },
        // 注销
        logout: function () {
        }
    },
    mounted: function () {
        // 如果未登陆则跳转到login
        app.user = {username:'test'}
        if (app.user === null) this.$router.push('/login');
        this.username = app.user.username;
        this.imgurl = util.mdAvatar(80, this.username);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #person_show {
        width: 50%;
        margin: 0 auto;
    }
    .person_title {
        font-size: 22px;
        font-weight: 700;
    }
</style>

<template>
    <div id="chat">
        <ToolBar v-bind:title="username"/>
        <div id="chat_body">
            <div class="mdui-textfield">
                <input id="chat_text" class="mdui-textfield-input"/>
            </div>
            <button id="chat_btn" class="mdui-textfield-close mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">send</i></button>
            <div id="chat_list">

            </div>
        </div>
    </div>
</template>

<script>
import ToolBar from './ToolBar'
export default {
    name: 'Chat',
    components: {ToolBar},
    data () {
        return {
            username: null,
        }
    },
    mounted: function () {
        app.user = {userid:8,username:'skt'};
        // 如果未登陆则跳转到login
        if (app.user === null) this.$router.push('/login');
        this.username = app.user.username;
        console.log(this.$route.params.userid)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mdui-textfield {
        padding-top: 0;
        float: left;
        width: 100%;
    }
    #chat_body {
        position: relative;
    }
    #chat_list {
        width: 100%;
    }
    #chat_text {
        padding-left: 10px;
    }
    #chat_btn {
        position: absolute;
        right: 0;
    }
</style>

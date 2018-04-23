<template>
    <div id="message">
        <ToolBar title="消息"/>
        <div id="message_body">
            <ul class="mdui-list">
                <li class="mdui-list-item mdui-ripple" v-for="m in list">
                    <div class="mdui-list-item-avatar"><img v-bind:src="toAvatarUrl(m.username)"/></div>
                    <div class="mdui-list-item-content">
                        <div class="mdui-list-item-title">{{m.username}}</div>
                        <div class="mdui-list-item-text mdui-list-item-one-line">{{m.content}}</div>
                    </div>
                  <div class="message_date">{{toChatTime(m.time)}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ToolBar from './ToolBar'
export default {
    name: 'Message',
    components: {ToolBar},
    data () {
        return {
            list: [],
        }
    },
    methods: {
        toAvatarUrl: function (text) {
            return util.mdAvatar(60, text);
        },
        toChatTime: function (time) {
            return util.toChatTime(time);
        },
        // 获得聊天列表
        onInit: function () {
            var self = this;
            axios.post(R.URL.CHAT_LIST_URL).then(function (obj) {
                if (obj.data.code !== 0) util.dialog.error(R.Str.ERROR_NETWORK);
                self.list = obj.data.obj;
            })
        },
    },
    mounted: function () {
        // 如果未登陆则跳转到login
        if (app.user === null) return this.$router.push('/login');
        this.onInit();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #message_body li {
        border-bottom: 1px solid #aaa;
        padding: 0 10px;
    }
    #message_body .mdui-list-item-title {
        font-weight: 700;
    }
    #message_body .mdui-list-item-text {
        color: #666;
    }
    #message_body .message_date {
        float: right;
        color: #666;
    }
</style>

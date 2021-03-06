<template>
    <div id="chat">
        <ToolBar v-bind:title="username"/>
        <div id="chat_body">
            <div class="mdui-textfield">
                <input id="chat_text" class="mdui-textfield-input" v-model="msg" @keyup.enter="onSend"/>
            </div>
            <button id="chat_btn" class="mdui-textfield-close mdui-btn mdui-btn-icon" v-on:click="onSend"><i class="mdui-icon material-icons">send</i></button>
        </div>
        <div id="chat_list">
            <div v-for="m in list" v-bind:class="isSelf(m) ? 'chat_item_l' : 'chat_item_r'">
                <img v-bind:src="toAvatarUrl(getMessageUsername(m))"/>
                <article>
                    <p class="item_time">{{toChatTime(m.time)}}</p>
                    <p class="item_content">{{m.content}}</p>
                </article>
            </div>
        </div>
        <button v-on:click="onClickMore" v-if="isMore" mdui-tooltip="{content: '加载更多'}" class="mdui-btn mdui-btn-icon mdui-btn-dense mdui-color-theme-accent mdui-ripple"><i class="mdui-icon material-icons">add</i></button>
    </div>
</template>

<script>
import ToolBar from './ToolBar'
export default {
    name: 'Chat',
    components: {ToolBar},
    data () {
        return {
            msg: '',
            // 聊天列表
            list: [],
            isMore: true,
            // 指代聊天的那个人
            username: null,
        }
    },
    watch: {
        msg: function (n, o) {
            if (n.length > 36) this.msg = o;
        }
    },
    methods: {
        isSelf: function (m) {
            return m.fromUserid === app.user.userid;
        },
        getMessageUsername: function (m) {
            return this.isSelf(m) ? app.user.username : this.username;
        },
        toAvatarUrl: function (text) {
            return util.mdAvatar(60, text);
        },
        toChatTime: function (time) {
            return util.toChatTime(time);
        },
        onClickMore: function () {
            var self = this;
            axios.post(R.URL.CHAT_HISTORY_URL, {userid: this.$route.params.userid, skipNum: this.list.length.toString()}).then(function (obj) {
                if (obj.data.code !== 0) return util.dialog.error(R.Str.ERROR_NETWORK);
                if (obj.data.obj.length === 0) {
                    self.isMore = false;
                    return;
                }
                for (var i in obj.data.obj) {
                    self.list.push(obj.data.obj[i]);
                }
            })
        },
        getTitleUsername: function (userid) {
            var self = this;
            axios.post(R.URL.SEARCH_URL, {userid: userid}).then(function (obj) {
                if (obj.data.code !== 0) return util.dialog.error(R.Str.ERROR_NETWORK);
                self.username = obj.data.obj[0].username
            })
        },
        // 当获得消息时
        onMessage: function (m) {
            this.list.unshift(m);
        },
        // 发送消息
        onSend: function () {
            util.Socket.commit(this.$route.params.userid, this.msg);
            this.msg = '';
        }
    },
    mounted: function () {
        // 如果未登陆则跳转到login
        if (app.user === null) return this.$router.push('/login');
        this.getTitleUsername(this.$route.params.userid);
        util.Socket.add(this.onMessage);
    },
    beforeDestroy: function () {
        util.Socket.add(null);
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
        margin-top: 44px;
        width: 100%;
    }
    #chat_text {
        padding-left: 10px;
    }
    #chat_btn {
        position: absolute;
        right: 0;
    }
    #chat_list img {
        width: 40px;
        height: 40px;
        margin: 0 5px;
    }
    #chat_list article {
        height: 40px;
    }
    .chat_item_l, .chat_item_r {
        height: 40px;
        margin: 10px 0;
    }
    .chat_item_l img, .chat_item_l article {
        float: left;
    }
    .chat_item_r img, .chat_item_r article {
        float: right;
    }
    .chat_item_l .item_time {
        text-align: left;
        font-size: 12px;
    }
    .chat_item_r .item_time {
        text-align: right;
        font-size: 12px;
    }
    #chat_list .item_time {
        height: 10px;
        line-height: 10px;
    }
    #chat_list .item_content {
        height: 30px;
        line-height: 30px;
    }
    .item_content {
        font-size: 18px;
        border-radius: 5px;
        border: 1px solid #aaa;
        word-wrap:break-word;
        word-break:break-all;
        padding: 0 5px;
    }

</style>

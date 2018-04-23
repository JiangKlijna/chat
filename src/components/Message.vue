<template>
    <div id="message">
        <ToolBar title="消息"/>
        <div id="message_body">
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

</style>

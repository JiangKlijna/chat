<template>
    <div id="chat">
        <ToolBar title="聊天"/>
        <div id="chat_body">
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

        }
    },
    mounted: function () {
        // 如果未登陆则跳转到login
        if (app.user === null) this.$router.push('/login');
        console.log(this.$route.params.userid)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

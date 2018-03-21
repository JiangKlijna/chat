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

        }
    },
    mounted: function () {
        // 如果未登陆则跳转到login
        if (app.user === null) this.$router.push('/login');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

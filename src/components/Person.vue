<template>
    <div id="person">
        <ToolBar title="我的"/>
        <div id="person_body" class="mdui-typo">
            <img v-bind:src="imgurl">
            <p><a href="#">修改昵称</a></p>
            <p><a href="#">修改密码</a></p>
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

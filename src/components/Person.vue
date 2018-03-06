<template>
    <div id="person">
        <ToolBar title="我的"/>
        <div id="person_body">
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

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

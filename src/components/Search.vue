<template>
    <div id="search">
        <ToolBar title="搜索"/>
        <div id="search_body">
            <div class="mdui-textfield mdui-textfield-floating-label">
                <label class="mdui-textfield-label">请输入userid或username</label>
                <input class="mdui-textfield-input" v-model="key"/>
            </div>
            <div>
                <div class="mdui-card mdui-ripple">
                    <div class="mdui-card-header">
                        <img class="mdui-card-header-avatar"/>
                        <div class="mdui-card-header-title"></div>
                        <div class="mdui-card-header-subtitle"></div>
                    </div>
                </div>
                <div class="mdui-divider"></div>
            </div>
            <div class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
                <div  v-for="u in usersByName" class="mdui-m-b-1 mdui-card mdui-ripple">
                    <div class="mdui-card-header">
                        <img class="mdui-card-header-avatar"/>
                        <div class="mdui-card-header-title"></div>
                        <div class="mdui-card-header-subtitle"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ToolBar from './ToolBar'
export default {
    name: 'Search',
    components: {ToolBar},
    data () {
        return {
            key: '',
            userById: {},
            usersByName: [],
        }
    },
    watch: {
        key: function (n) {
            if (n === '') return
            console.log(n);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#search_body {
    text-align: left;
}
</style>

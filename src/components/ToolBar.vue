<template>
    <div id="menu" class="app_title mdui-toolbar mdui-color-theme mdui-ripple">
        <a v-on:click="onBack" v-show="!isRoot" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">arrow_back</i></a>
        <span class="mdui-typo-title">{{title}}</span>
        <div class="mdui-toolbar-spacer"></div>
        <a v-on:click="onClickIcon('/')" v-show="!isRoot" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">message</i></a>
        <a v-on:click="onClickIcon('/theme')" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">color_lens</i></a>
        <a v-on:click="onClickIcon('/search')" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">search</i></a>
        <a v-on:click="onClickIcon('/person')" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">person</i></a>
    </div>
</template>

<script>
export default {
    name: 'ToolBar',
    props: ['title'],
    data: function () {
        return {
            //title: '消息',
            isRoot: this.$router.currentRoute.path === '/',
        }
    },
    methods: {
        onBack: function () {
            var hash = location.hash, n = 1, i;
            for (i = hash.length-1; i >= 0; i--) {
                if (hash[i] === '#') n++;
                else break;
            }
            for (i = 0; i < n; i++) {
                this.$router.back();
            }
        },
        onClickIcon: function (path) {
            this.$router.push(path);
        },
        onBeforeEach: function (to, from, next) {
            this.isRoot = to.path == '/';
            next();
        }
    },
    mounted: function () {
        window.menu = this;
        this.$router.beforeEach(this.onBeforeEach);
    }
}
</script>

<style>
#main #menu {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
#menu .mdui-menu-item:hover {
    background: rgba(0,0,0,.2);
}
</style>

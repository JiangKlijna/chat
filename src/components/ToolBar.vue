<template>
    <div id="menu" class="mdui-toolbar mdui-color-theme">
        <a v-on:click="onBack" v-show="!isRoot" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">arrow_back</i></a>
        <span class="mdui-typo-title">{{title}}</span>
        <div class="mdui-toolbar-spacer"></div>
        <a v-on:click="onClickIcon('/')" v-show="!isRoot" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">message</i></a>
        <a v-on:click="onClickIcon('/theme')" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">color_lens</i></a>
        <a class="mdui-btn mdui-btn-icon" mdui-menu="{target: '#menu_item'}"><i class="mdui-icon material-icons">more_vert</i></a>
        <ul id="menu_item" class="mdui-menu mdui-color-theme">
            <li class="mdui-menu-item mdui-ripple"><i class="mdui-menu-item-icon mdui-icon material-icons">group</i>好友</li>
            <li class="mdui-divider"></li>
            <li class="mdui-menu-item mdui-ripple"><i class="mdui-menu-item-icon mdui-icon material-icons">person</i>我的</li>
            <li class="mdui-divider"></li>
            <li class="mdui-menu-item mdui-ripple"><i class="mdui-menu-item-icon mdui-icon material-icons">settings</i>设置</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ToolBar',
    data: function () {
        return {
            title: '消息',
            isRoot: this.$router.currentRoute.path == '/',
        }
    },
    methods: {
        onBack: function () {
            this.$router.back();
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

<template>
    <div id="search">
        <ToolBar title="搜索"/>
        <div id="search_body">
            <div class="mdui-textfield mdui-textfield-floating-label">
                <label class="mdui-textfield-label">请输入userid或username</label>
                <input class="mdui-textfield-input" v-model="key"/>
            </div>
            <div v-if="userById" class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
                <div class="mdui-card mdui-ripple mdui-col">
                    <div class="mdui-card-header" v-on:click="onClickUser(userById)">
                        <img class="mdui-card-header-avatar" v-bind:src="toAvatarUrl(userById.username)"/>
                        <div class="mdui-card-header-title mdui-text-color-theme-accent">{{userById.userid}}</div>
                        <div class="mdui-card-header-subtitle">{{userById.username}}</div>
                    </div>
                </div>
            </div>
            <br>
            <div class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
                <div v-for="u in usersByName" class="mdui-col mdui-card mdui-ripple">
                    <div class="mdui-card-header" v-on:click="onClickUser(u)">
                        <img class="mdui-card-header-avatar" v-bind:src="toAvatarUrl(u.username)"/>
                        <div class="mdui-card-header-title">{{u.userid}}</div>
                        <div class="mdui-card-header-subtitle mdui-text-color-theme-accent">{{u.username}}</div>
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
            userById: null,
            usersByName: [],
        }
    },
    methods: {
        toAvatarUrl: function (text) {
            return util.mdAvatar(60, text);
        },
        onClickUser: function (u) {
            this.$router.push('/chat?userid=' + u.userid);
        },
        search: function (sobj) {
            var self = this;
            axios.post(R.URL.SEARCH_URL, sobj).then(function (obj) {
                if (obj.data.code !== 0) return util.dialog.error(R.Str.ERROR_NETWORK);
                if (sobj.userid) self.userById = obj.data.obj[0];
                if (sobj.username) self.usersByName = obj.data.obj;
            })
        }
    },
    watch: {
        key: function (n, o) {
            if (n === '') return;
            if (n.length >= 10) {
                this.key = o;
                return;
            }
            // search by username
            this.search({username: n});
            // search by userid
            if(!isNaN(n)) this.search({userid: n});
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
#search_body {
    text-align: left;
}
</style>

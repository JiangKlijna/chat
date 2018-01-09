<template>
    <div id="theme">
        <ToolBar title="主题"/>
        <div id="theme_body">
            <form class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
                <p class="mdui-typo-title mdui-text-color-theme">主题色</p>
                <div v-for="color in primary_colors" v-bind:class="'mdui-col mdui-text-color-'+color">
                    <label class="mdui-radio mdui-m-b-1">
                        <input type="radio" name="doc-theme-accent" v-on:click="onClickPrimaryColor(color)" v-bind:value="color" v-bind:checked="current_primary_color === color">
                        <i class="mdui-radio-icon"></i>{{getColorTitle(color)}}
                    </label>
                </div>
            </form>
            <form class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
                <p class="mdui-typo-title mdui-text-color-theme-accent">强调色</p>
                <div v-for="color in accent_colors" v-bind:class="'mdui-col mdui-text-color-'+color">
                    <label class="mdui-radio mdui-m-b-1">
                        <input type="radio" name="doc-theme-accent" v-on:click="onClickAccentColor(color)" v-bind:value="color" v-bind:checked="current_accent_color === color">
                        <i class="mdui-radio-icon"></i>{{getColorTitle(color)}}
                    </label>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import ToolBar from './ToolBar'
export default {
    name: 'Theme',
    components: {ToolBar},
    data: function () {
        return {
            accent_colors: [],
            primary_colors: [],
        }
    },
    methods: {
        onClickAccentColor: function (color) {
            app.accent_color = color;
        },
        onClickPrimaryColor: function (color) {
            app.primary_color = color;
        },
        getColorTitle: function (color) {
            return window.util.toUpperTitle(color);
        }
    },
    computed: {
        current_accent_color: function () {
            return app.accent_color;
        },
        current_primary_color: function () {
            return app.primary_color;
        }
    },
    mounted: function () {
        this.accent_colors = window.R.accent_colors;
        this.primary_colors = window.R.primary_colors;
        // window.theme = this;
    }
}
</script>

<style>
    .mdui-col {
        text-align: left;
        font-size: 16px;
    }
    .mdui-typo-title {
        text-align: left;
        font-size: 19px;
        font-weight: 800;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    #theme_body {
        padding-top: 15px;
        padding-left: 25px;
    }
</style>

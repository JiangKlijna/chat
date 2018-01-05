<template>
    <div id="theme">
        <ToolBar title="主题"/>
        <div id="theme_body" class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
            <div v-for="color in colors" v-bind:class="'mdui-col mdui-text-color-'+color">
                <label class="mdui-radio mdui-m-b-1">
                    <input type="radio" name="doc-theme-accent" v-on:click="onClickColor(color)" v-bind:value="color" v-bind:checked="current === color">
                    <i class="mdui-radio-icon"></i>{{color}}
                </label>
            </div>
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
            current: null,
            colors: []
        }
    },
    methods: {
        onClickColor: function (color) {
            app.theme_color = color;
        }
    },
    mounted: function () {
        this.current = app.theme_color;
        this.colors = window.R.colors;
        //window.theme = this;
    }
}
</script>

<style>
    .mdui-col {
        text-align: left;
    }
    #theme_body {
        padding: 10px;
    }
</style>

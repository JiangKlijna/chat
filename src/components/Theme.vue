<template>
    <div id="theme" class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
        <div v-for="color in colors" v-bind:class="'mdui-col mdui-text-color-'+color">
            <label class="mdui-radio mdui-m-b-1">
                <input type="radio" name="doc-theme-accent" v-on:click="onClickColor(color)" v-bind:value="color" v-bind:checked="current === color">
                <i class="mdui-radio-icon"></i>{{color}}
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Theme',
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
        window.theme = this;
    }
}
</script>

<style>
    .mdui-col {
        text-align: left;
    }
</style>

<template>
    <div id="theme" class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
        <div v-for="color in colors" v-bind:class="'mdui-col mdui-text-color-'+color">
            <label class="mdui-radio mdui-m-b-1">
                <input type="radio" name="doc-theme-accent" v-bind:value="color">
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
            colors: []
        }
    },
    mounted: function () {
        this.colors = window.R.colors;
        window.theme = this;
    }
}
</script>

<style>
    #theme {
        height: 80%;
        padding: 10px;
        overflow: scroll;
    }
    .mdui-col {
        text-align: left;
    }
</style>

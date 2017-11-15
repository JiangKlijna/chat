<template>
    <div id="app" class="hundred">
        <div id="main" v-bind:class="main_class" v-bind:style="{'margin-top': main_marginTop + 'px'}">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data: function () {
        return {
            main_class: null,
            main_marginTop: 60
        }
    },
    methods: {
        onResize: function () {
            if (window.innerWidth < 780) { // 调整为移动端样式
                this.main_class = "hundred";
            } else { // 调整为pc端样式
                this.main_class = "pc_main";
                this.main_marginTop = ((window.innerWidth-780) / (window.screen.width-780)) * 60;
            }
        }
    },
    mounted: function () {
        window.onresize = this.onResize;
        window.onresize();
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    font-family: consolas;
}
html, body, .hundred {
    width: 100%;
    height: 100%;
}
#app {
  text-align: center;
  background-color: #f1f1f1;
}
#main {
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    vertical-align: middle;
    display: inline-block;
}
.pc_main {
    width: 600px;
    height: 800px;
    margin: 0 auto;
}
</style>

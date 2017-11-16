<template>
    <div id="app" class="hundred">
        <div id="main" v-bind:style="main_style">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data: function () {
        return {
            main_style: {
                'width': '800px',
                'height': '800px',
                'margin-top': '60px',
            }
        }
    },
    methods: {
        onResize: function () {
            if (window.innerWidth < 800) { // 调整为移动端样式
                this.main_style['margin-top'] = 0;
                this.main_style.width = '100%';
                this.main_style.height = '100%';
            } else { // 调整为pc端样式
                let marginTop = parseInt((window.innerWidth-800) / (window.screen.width-800) * 60);
                this.main_style['margin-top'] = marginTop + 'px';
                this.main_style.height = (window.innerHeight - marginTop * 2) + 'px';
                this.main_style.width = '800px';
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
    margin: 0 auto;
    border-radius: 6px;
    background-color: white;
    box-shadow: 0 0 8px rgba(0,0,0,.3);
    vertical-align: middle;
    display: inline-block;
}
</style>

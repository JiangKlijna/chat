<template>
  <div id="app" class="hundred">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
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
}
</style>

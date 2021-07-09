<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: auto;
  background: #fff;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 200px;
  right: 0px;
  padding: 32px;
  overflow: hidden;
  overflow-y: auto;
}
</style>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');

#app {
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.row {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
</style>

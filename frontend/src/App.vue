<template>
  <div id="app">
    <Form/>
    <router-view />
  </div>
</template>

<script>
import Form from '@/components/Form'

export default {
  components: { Form }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.row {
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div id="app">
    <Home></Home>
    <router-view/>
  </div>
</template>

<script>
import Home from './components/Home'
export default {
  name: 'App',
  components: {
    Home
  },
}
</script>

<style>
body {
  background: #eeeeee
}
.default {
  background: #ffffff
}
</style>

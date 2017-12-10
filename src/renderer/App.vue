<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
  import Home from '@/components/Home'
  require('../../node_modules/bootstrap/dist/css/bootstrap.css')
  export default {
    name: 'music-player',
    components: {
      Home
    }
  }
</script>

<style>
  /* CSS */
</style>

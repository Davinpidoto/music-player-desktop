<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
  import Home from '@/components/Home'
  import axios from 'axios'
  export default {
    name: 'music-player',
    components: {
      Home
    }
  }
  const {ipcRenderer} = require('electron')
  ipcRenderer.on('load', function () {
    axios.get(this.$base + 'load')
      .then(function (response) {
        self.artists = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  })
</script>

<style>
  @import '../../node_modules/bootstrap/dist/css/bootstrap.css';
</style>

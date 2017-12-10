<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
  import Home from '@/components/Home'
  import axios from 'axios'
  const root = 'http://192.168.0.20:8080/'
  export default {
    name: 'music-player',
    components: {
      Home
    }
  }
  const {ipcRenderer} = require('electron')
  ipcRenderer.on('load', function () {
    axios.get(root + 'load')
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

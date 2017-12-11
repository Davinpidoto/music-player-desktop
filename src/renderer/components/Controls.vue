<template>
  <nav id="controls">
    <ul class="pager pull-right">
      <li><span class="glyphicon control glyphicon-play" aria-hidden="true"></span></li>
      <li><span class="glyphicon control glyphicon-pause" aria-hidden="true"></span></li>
      <li><span class="glyphicon control glyphicon-stop" aria-hidden="true" v-on:click="stop()"></span></li>
      <li><span class="glyphicon control glyphicon-step-forward" aria-hidden="true" v-on:click="skip()"></span></li>
    </ul>
  </nav>
</template>

<script>
  import axios from 'axios'
  const root = 'http://192.168.0.20:8080/'
  export default {
    name: 'controls',
    methods: {
      stop: function () {
        axios.get(root + 'stop')
          .then(function (response) {
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      skip: function () {
        axios.get(root + 'next')
          .then(function (response) {
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style>

  .control {
    cursor: pointer;
  }

  .control:active {
    background-color:#BFC9CA;
  }

  #controls{
    margin-top:-10px;
  }

  .pager li > span{
    border-radius:5px;
  }

</style>
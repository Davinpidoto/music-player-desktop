<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top"></nav>
    <div class="col-sm-4">
      <artists></artists>
    </div>
    <div class="col-sm-8">
      <app-header :artist="artist"></app-header>


      <div class="container">
        <div class="row">
          <albums :artist="artist"></albums>
        </div>
      </div>
    </div>

    <div id="footer"></div>
  </div>
</template>

<script>
  import Albums from '@/components/Albums'
  import AppHeader from '@/components/AppHeader'
  import Artists from '@/components/Artists'
  import axios from 'axios'

  export default {
    name: 'home',
    data () {
      return {
        artists: [],
        artist: '',
        search: ''
      }
    },
    created () {
      this.$eventHub.$on('test', id => {
        this.getArtist(id)
      })
    },
    components: {
      'artists': Artists,
      'albums': Albums,
      'app-header': AppHeader
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      getArtist: function (id) {
        let self = this
        axios.get(this.$base + 'artists/' + id)
          .then(function (response) {
            self.$data.artist = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style>
  body {
    padding-top: 35px;
    font-size: 12px;
    overflow:hidden;
    background-color:#F7F9FA;
  }
  .hand {
    cursor: pointer;
  }
  .navbar {
    min-height: 30px;
  }
  .navbar-default {
    background-color: #2c3e50;
    border-color: transparent;
  }
  .navbar-default {
    color: #ffffff;
  }

  .table > tbody > tr > td, .table > tfoot > tr > td {
    padding: 4px;
  }
  #footer{
    margin-bottom:0;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-color: #2c3e50;
  }

</style>

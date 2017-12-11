<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top"></nav>
    <div class="container">
      <div class="row">
        <div class="col-sm-1">
          <h4>Artists</h4>
        </div>
        <div class="col-sm-3 form-group">
          <input type="text" class="form-control search" v-model="search" placeholder="Search">
        </div>
        <div class="col-sm-4">
          <h4>{{artist.name}}</h4>
        </div>
        <div class="col-sm-4">
          <controls></controls>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-sm-4" id="artists">
          <div class="panel panel-default">
            <table class="table table-striped table-bordered">
              <tbody>
              <tr v-for="item in filteredArtists">
                <td class="hand" v-on:click="getArtist(item.id)">{{item.name}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <albums :artist="artist"></albums>
      </div>
    </div>
    <div id="footer"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Albums from '@/components/Albums'
  import Controls from '@/components/Controls'
  const root = 'http://192.168.0.20:8080/'
  const {ipcRenderer} = require('electron')

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
      let fetchArtists = () => {
        let self = this
        axios.get(root + 'artists')
          .then(function (response) {
            self.artists = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      fetchArtists()
      ipcRenderer.on('refresh', function () {
        fetchArtists()
      })
    },
    components: {
      'albums': Albums,
      'controls': Controls
    },
    computed: {
      filteredArtists () {
        return this.artists.filter(artist => {
          return artist.name.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      getArtist: function (id) {
        let self = this
        axios.get(root + 'artists/' + id)
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
  #artists{
    height: 677px;
    overflow:hidden;
  }
  #artists:hover{
    overflow-y: scroll
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
  .search {
    margin-top: 10px;
    height: 25px;
  }
</style>

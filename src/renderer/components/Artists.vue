<template>
  <div>
    <div class="row">
      <div class="col-sm-4">
        <h4>Artists</h4>
      </div>
      <div class="col-sm-8 form-group">
        <input type="text" class="form-control search" v-model="search" placeholder="Search">
      </div>
    </div>
    <div id="artists">
      <div class="panel panel-default">
        <table class="table table-striped table-bordered">
          <tbody>
          <tr v-for="item in filteredArtists">
            <td class="hand" @click="sendArtistEvent(item.id)">{{item.name}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  const {ipcRenderer} = require('electron')
  export default {
    data () {
      return {
        artists: [],
        search: '',
        artist: ''
      }
    },
    computed: {
      filteredArtists () {
        return this.artists.filter(artist => {
          return artist.name.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    created () {
      let fetchArtists = () => {
        let self = this
        axios.get(this.$base + 'artists')
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
    methods: {
      sendArtistEvent: function (id) {
        this.$eventHub.$emit('test', id)
      }
    }
  }
</script>

<style>
  .search {
    margin-top: 10px;
    height: 25px;
  }
  #artists{
    height: 677px;
    overflow:hidden;
  }
  #artists:hover{
    overflow-y: scroll
  }
</style>
<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top"></nav>

    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h4 class="topHeader">Artists</h4>
        </div>
        <div class="col-md-8">
          <h4 class="topHeader">{{artist.name}}</h4>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-4" id="artists">
          <div class="panel panel-default">
            <table class="table table-striped table-bordered">
              <tbody>
              <tr v-for="item in artists">
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
  const root = 'http://pi:8080/'
  export default {
    name: 'home',
    data () {
      return {
        artists: [],
        artist: ''
      }
    },
    created () {
      let self = this
      axios.get(root + 'artists')
        .then(function (response) {
          self.artists = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    components: {
      'albums': Albums
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
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    padding-top: 35px;
    font-size: 12px;
    overflow:hidden;
    background-color:#F7F9FA;
  }
  .hand {
    cursor: pointer;
    cursor: hand;
  }
  .topHeader {
    margin-bottom:20px;
    position: fixed;
    z-index:1000
  }
  .navbar {
    min-height: 30px;
  }
  .navbar-default {
    background-color: #2c3e50;
    border-color: transparent;
  }
  .navbar-default .navbar-brand {
    color: #ffffff;
  }
  #artists{
    margin-top:50px;
    height: 750px;
    overflow:hidden;
  }
  #artists:hover{
    overflow-y: scroll
  }
  .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
    padding: 4px;
  }

  #footer{
    margin-bottom:0px;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8px; /* Set the fixed height of the footer here */
    line-height: 60px; /* Vertically center the text there */
    background-color: #2c3e50;
  }

</style>

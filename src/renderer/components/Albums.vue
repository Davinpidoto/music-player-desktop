<template>
    <div class="col-md-8" id="albums">
        <div v-if="artist">
            <div class="panel panel-default" v-for="album in artist.albums">
                <div class="panel-heading hand" v-on:click="playAlbum(album.id)">{{album.title}}</div>
                <table class="table table-striped table-bordered">
                    <tbody>
                    <tr v-for="song in album.songs">
                        <td class="hand"  v-on:click="playSong(song.id)">{{song.title}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    props: ['artist'],
    methods: {
      playAlbum: function (id) {
        axios.get('http://pi:8080/albums/' + id)
          .catch(function (error) {
            console.log(error)
          })
      },
      playSong: function (id) {
        axios.get('http://pi:8080/songs/' + id)
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
    #albums{
    margin-top:50px;
    height: 750px;
    overflow:hidden;
    }

    #albums:hover{
    overflow-y: scroll
}
    .panel-heading {
        padding: 4px 4px;
        font-weight: bold;
        border-bottom: 1px solid transparent;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }

</style>
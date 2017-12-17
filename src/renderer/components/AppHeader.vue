<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4">
        <h4>{{artist.name}}</h4>
      </div>
      <div class="col-sm-4">
        <controls></controls>
      </div>
    </div>
  </div>
</template>

<script>
  import Controls from '@/components/Controls'
  export default {
    props: ['artist'],
    components: {
      'controls': Controls
    }
  }
</script>
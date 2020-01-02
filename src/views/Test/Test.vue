<template>
  <div v-viewer="options"
       class="images">
    <img :src="images"
         class="image">
  </div>
</template>
<script>
export default {
  data () {
    return {
      options: {
        toolbar: true,
        url: 'data-source'
      },
      images: [require('../../assets/50_20190916001.png')]
    }
  },
  computed: {
  },

}
</script>

<style  scoped>
.image {
  width: calc(20% - 10px);
  cursor: pointer;
  margin: 5px;
  display: inline-block;
}
</style>
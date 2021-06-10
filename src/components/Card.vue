<template>
  <div class="col-12 col-sm-4 col-md-3 m-1">    
      <img :src="item.images.small"  :alt="item.name">
  </div>
</template>

<script>


export default {
  name: 'card',
  props: {
    item: Object,
  },
  data() {
    return {
    }
  },
  components: {
  },
  computed: {
    // mapstate
  },
  watch: {
  },
  methods: {
    // mapaction
  }
}
</script>

<style lang="scss" scoped>

div {
  img {
    width: 100%;
  }
}
</style>
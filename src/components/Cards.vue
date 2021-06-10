<template>
  <div>
    <!-- import filter composant -->
    <filters />

    <!-- Pagination -->
    <pagination/>
    <!-- import card composant -->
    <div class="d-flex flex-wrap justify-content-evenly">
      <card v-for="(item, id) in cards.data" :key="id" :item="item" />
    </div>

    <!-- Pagination -->
    <pagination/>
    
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Filters from '../components/Filters'
import Card from '../components/Card'
import Pagination from './UI/Pagination.vue'


export default {
  name: 'cards',
  data() {
    return {
    }
  },
  mounted() {
    this.getCards()
  },
  components: {
    Filters,
    Card,
    Pagination,
  },
  computed: {
    // mapstate
    ...mapState('cards', ['cards']),
  },
  watch: {
  },
  methods: {
    // mapaction
    ...mapActions('cards', ['getCards']),
  }
}
</script>

<style lang="scss">

</style>
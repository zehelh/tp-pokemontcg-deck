<template>
    <nav class="d-flex justify-content-center m-2">
      <ul class="pagination">
        <li class="page-item"><a class="page-link text-dark" role="button" @click="getCards({page: cards.page - 1})">Précédent</a></li>
        <li class="page-item" v-show="cards.page > 2"><a class="page-link text-dark" role="button" @click="getCards({page: cards.page - 2})">{{cards.page -2}}</a></li>
        <li class="page-item" v-show="cards.page > 1"><a class="page-link text-dark" role="button" @click="getCards({page: cards.page - 1})">{{cards.page -1}}</a></li>
        <li class="page-item active"><a class="page-link" @click="getCards({page: cards.page})">{{cards.page}}</a></li>
        <li class="page-item"><a class="page-link text-dark" role="button" @click="getCards({page: cards.page + 1})">{{cards.page +1}}</a></li>
        <li class="page-item"><a class="page-link text-dark" role="button" @click="getCards({page: cards.page + 2})">{{cards.page +2}}</a></li>
        <li class="page-item"><a class="page-link text-dark" role="button" @click="getCards({page: cards.page + 1})">Suivant</a></li>
      </ul>
    </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'


export default {
  name: 'pagination',
  data() {
    return {
    }
  },
  components: {
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
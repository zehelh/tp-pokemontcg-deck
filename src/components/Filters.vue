<template>
  <div class="d-flex flex-column flex-lg-row justify-content-lg-between">
    <div class="d-flex align-items-center m-2">
      <p class="m-1 me-3">Filtres:</p>

      <select class="form-select mx-2" v-model="info.sortType" @change="getCards(info)" role="button">
        <option value="" disabled selected>Types</option>
        <option value="">Tous</option>
        <option v-for="(type, id) in types.data" :key="id">{{type}}</option>
      </select>

      <select class="form-select mx-2" v-model="info.sortRarity" @change="getCards(info)" role="button">
        <option value="" disabled selected>Rareté</option>
        <option value="">Tous</option>
        <option v-for="(rarity, id) in rarities.data" :key="id">{{rarity}}</option>
      </select>

      <select class="form-select mx-2" v-model="info.sortCollection" @change="getCards(info)" role="button">
        <option value="" disabled selected>Collection</option>
        <option value="">Tous</option>
        <option v-for="(collection, id) in collections.data" :key="id" :value="collection.id">{{collection.name}}</option>
      </select>

    </div>
    <div class="m-2 d-flex col-12 col-lg-4">
      <input type="text" class="form-control" placeholder="Rechercher une carte" v-model="info.inputValue" @keypress.enter="getCards(info)">
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'


export default {
  name: 'filters',
  data() {
    return {
      info: {
        inputValue: '',
        sortType: '',
        sortRarity: '',
        sortCollection: '',
      },
    }
  },
  mounted() {
    this.getTypes()
    this.getRarities()
    this.getCollections()
  },
  components: {
  },
  computed: {
    // mapstate
    ...mapState('cards', ['types', 'rarities', 'collections']),
  },
  watch: {
  },
  methods: {
    // mapaction
    ...mapActions('filters', ['updateInput']),
    ...mapActions('cards', ['getCards', 'getTypes', 'getRarities', 'getCollections']),
  }
}
</script>

<style lang="scss">

</style>
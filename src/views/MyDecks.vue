<template>
  <div class="my-decks">
    <img src="https://content.instructables.com/ORIG/F2U/EKL7/IVO5GKOR/F2UEKL7IVO5GKOR.jpg?auto=webp" alt="pokemon tcg board game">

    <section class="card card-list col-10 col-md-8 mt-5">
      
    <div class="col-12">
    </div>
      <div class="card-header">
        <h1>Mes decks</h1>
      </div>
      <div class="card-body d-flex justify-content-evenly">
        <div v-for="(deck, id) in decks.data" :key="id" class="card col-2">
          <div class="card-body text-center">
            <p class="h5">{{deck.name}}</p>
            <p v-if="deck.isFavorite" class="fas fa-star h1 fav"></p>
          </div>
        </div>
      </div>

    </section>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'myDecks',
  components: {
  },
  mounted() {
    this.getDecks()
  },
  computed: {
    // mapstate
    ...mapState('decks', ['decks']),
  },
  methods: {
    // mapaction
    ...mapActions('decks', ['getDecks']),
  }
}
</script>

<style lang="scss" scoped>

  .my-decks {
    display: flex;
    justify-content: center;

    img {
      position: fixed;
      z-index: -1;
      top: 0;
      width: 100vw;
      height: 100vh;
      filter: blur(2px);
      filter: brightness(60%);
    }
    
    .card {
      background-color: rgba($color: #ffffff, $alpha: 0.8);
    }

    .fav {
      color: gold;
    }

  }


</style>
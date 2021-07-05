<template>
  <div class="my-decks">
    <img src="https://content.instructables.com/ORIG/F2U/EKL7/IVO5GKOR/F2UEKL7IVO5GKOR.jpg?auto=webp" alt="pokemon tcg board game">

    <section class="card card-list col-10 col-md-8 mt-5">
      
    <div class="col-12">
    </div>
      <div class="card-header">
        <h1>Mes decks</h1>
      </div>
      <div class="card-body d-flex justify-content-evenly flex-wrap">
        <div v-for="(deck, id) in decks.data" :key="id" class="card col-2 m-2 pointer" @click="editDeck(deck.id)">
          <div class="card-body text-center">
            <p class="h4">{{deck.name}}</p>
            <p v-if="deck.status === 0">Incomplet</p>
            <p v-else>Complet</p>
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
  data() {
    return {
    }
  },
  components: {
  },
  mounted() {
    this.getDecks()
  },
  computed: {
    // mapstate
    ...mapState('decks', ['decks', 'cardList']),
    triggerEmoji() {
      return this.getEmoji()
    }
  },
  methods: {
    // mapaction
    ...mapActions('decks', ['getDecks', 'getCardList']),
    editDeck(id) {
      this.$router.push({ path: `/edit-deck/${id}` });
    },
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

    .pointer {
      cursor: pointer;
    }

  }


</style>
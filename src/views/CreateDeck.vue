<template>
  <div class="create-decks">
    <img src="https://content.instructables.com/ORIG/F2U/EKL7/IVO5GKOR/F2UEKL7IVO5GKOR.jpg?auto=webp" alt="pokemon tcg board game">

    <section class="card card-list col-10 col-md-8 mt-5">
      
    <div class="col-12">
    </div>
      <div class="card-header">
        <h1>Création de deck</h1>
      </div>
      <div class="card-body">
        <div class="d-flex">
          <div class="col-8">
            <cards v-if="isEditing" />
          </div>
          <div class="col-4">
            <div class="col-12 m-2 d-flex">
              <p v-if="!isEditing" class="h5 m-1">{{deckTitle}}</p>
              <input v-else class="form-control" v-model="inputTitle" placeholder="Titre du Deck">
              <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <input class="btn-check" id="btncheck1" @click="changeFav">
                <label v-if="isFav" class="btn btn-outline-primary stars fav" for="btncheck1"><i class="fas fa-star"></i></label>
                <label v-else class="btn btn-outline-primary stars" for="btncheck1"><i class="fas fa-star"></i></label>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p class="m-0">Total de cartes: </p>
              <button v-if="isEditing"  class="btn btn-primary" @click="stopEdit(inputTitle)">Arêtter la modification</button>
              <button v-else class="btn btn-primary" @click="edit">Modifier le deck</button>
            </div>
            <div class="card mt-5">
              <div class="card-body">
                <p>contenu</p>
                <p>contenu</p>
                <p>contenu</p>
                <p>contenu</p>
                <p>contenu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Cards from '../components/Cards'

export default {
  name: 'createDeck',
  components: {
    Cards,
  },
  data() {
    return {
      inputTitle: '',
    }
  },
  computed: {
    // mapstate
    ...mapState('decks', ['isFav', 'isEditing', 'deckTitle']),
  },
  methods: {
    // mapaction
    ...mapActions('decks', ['createDeck', 'changeFav', 'stopEdit', 'edit']),
  }
}
</script>


<style lang="scss" scoped>

  .create-decks {
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

    .stars {
      border: none;
      background-color: transparent;
      &:hover {
        color: grey;
      }
    }

    .fav {
      color: gold;
    }

  }


</style>
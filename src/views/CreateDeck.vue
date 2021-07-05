<template>
  <div class="create-decks">
    <img src="https://content.instructables.com/ORIG/F2U/EKL7/IVO5GKOR/F2UEKL7IVO5GKOR.jpg?auto=webp" alt="pokemon tcg board game">

    <section class="card card-list col-10 col-md-8 mt-5">
      
      <div class="card-header">
        <h1>{{ statement }} de deck</h1>
      </div>
      <div class="card-body">
        <div class="d-flex">
          <div class="col-8">
            <cards v-if="showCards()" />
          </div>
          <div class="col-4">
            <div class="col-12 my-2 d-flex">
              <p v-if="!isEditing" class="h5 m-1">{{deckTitle}}</p>
              <input v-else class="form-control" v-model="inputTitle" placeholder="Titre du Deck">
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p class="m-0">Total de cartes: {{totalCards()}}</p>
              <button v-if="isEditing"  class="btn btn-primary" @click="stopEdit(inputTitle)">Arêtter la modification</button>
              <button v-else class="btn btn-primary" @click="edit">Modifier le deck</button>
            </div>
            <div class="card mt-5">
              <div class="card-body" v-if="isEditing">
                <div v-for="(item, id) in cardList" :key="id" @click="decrementCard(item)" class="d-flex justify-content-evenly pointer">
                  <p>{{item.name}}</p>
                  <p>x{{item.quantity}}</p>
                </div>
              </div>
              <div class="card-body" v-else>
                <div v-for="(item, id) in cardList" :key="id" class="d-flex justify-content-evenly">
                  <p>{{item.name}}</p>
                  <p>x{{item.quantity}}</p>
                </div>
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
  mounted() {
    this.getCardList(this.$route.params.id)
  },
  computed: {
    // mapstate
    ...mapState('decks', ['isFav', 'isEditing', 'deckTitle', 'cardList']),
  },
  beforeMount() {
    this.hasData()
  },
  methods: {
    // mapaction
    ...mapActions('decks', ['createDeck', 'changeFav', 'stopEdit', 'edit', 'findDeck', 'reset', 'getCardList', 'decrementCard']),
    async hasData() {
      if(this.$route.name == 'editDeck') {
        this.reset()
        await this.findDeck(this.$route.params.id)
        this.inputTitle = this.deckTitle
        this.statement = 'Modification'
      } else {
        this.reset()
        this.statement = 'Création'
      }
    },
    totalCards() {
      let tmp = 0
        for (const key in this.cardList) {
          tmp += this.cardList[key].quantity
        }
      return tmp
    },
    showCards() {
      return this.isEditing && this.$route.name == 'editDeck'
    }
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

    .pointer {
      cursor: pointer;
    }

  }


</style>
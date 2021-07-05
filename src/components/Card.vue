<template>
  <div class="col-12 col-sm-4 col-md-3 m-1 pointer position-relative">
      <img v-if="newItem.id == item.id && newItem.quantity > 0" :src="item.images.small"  :alt="item.name" class="highlight">
      <img v-else :src="item.images.small"  :alt="item.name">
      <!-- Comparaison des id pour tromper la remanence de la pastille de quantité, voir fonction isInDeck ci dessous -->
      <span v-if="newItem.id == item.id" class="fs-6 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {{ newItem.quantity }}
        <span class="visually-hidden">unread messages</span>
      </span>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'card',
  props: {
    item: Object,
  },
  data() {
    return {
      cardCount: 0,
      newItem: {},
    }
  },
  components: {
  },
  computed: {
    ...mapState('decks', ['cardList']),
    
  },
  watch: {
  },
  methods: {

    isInDeck() {
      if(this.$route.name == 'editDeck') {
        for (const key in this.cardList) {
            const element = this.cardList[key]
            if(element.card_api_id == this.item.id) {
              // Pour tromper la remananence de la pastille avec la quantité des carte, on crée un nouvel obj avec les memes propriété que celui de base
              // et on lui ajoute la quantité on comparera ensuite l'id des 2 pour n'afficher la pastille que lorsqu'on est sur qu'il s'agit de la bonne carte
              this.newItem = this.item
              this.newItem.quantity = element.quantity
            }
        }
      } else {
        this.newItem.quantity = 0
      }
    }

  },
  beforeMount() {
    this.isInDeck()
  },
  updated() {
    this.isInDeck()
  }
}
</script>

<style lang="scss" scoped>

div {
  img {
    width: 100%;
  }

    .pointer {
      cursor: pointer;
    }
}


  .highlight {
    box-shadow: 0px 0px 20px #4195fc;
    border-radius: 6px;
  }
</style>
<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Pokemon TCG Deck Builder</a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" :to="home">Home</router-link>
          <router-link class="nav-link" :to="myDecks">Mes decks</router-link>
          <router-link class="nav-link" :to="createDecks">Créer un deck</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>


export default {
  name: 'navbar-app',
  data() {
    return {
    }
  },
  components: {
  },
  computed: {
    home() {
      return { name: 'home' }
    },
    myDecks() {
      return { name: 'myDecks' }
    },
    createDecks() {
      return { name: 'createDeck' }
    },
    // mapstate
  },
  watch: {
  },
  methods: {
    // mapaction
  }
}
</script>

<style lang="scss">

</style>
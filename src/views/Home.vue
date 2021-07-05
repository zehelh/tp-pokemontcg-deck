<template>
  <div class="home">
    <img src="https://cdn03.nintendo-europe.com/media/images/10_share_images/games_15/game_boy_color_5/H2x1_GBC_PokemonTradingCardGame_image1600w.jpg" alt="Image pokemon tcg">

    <section class="card card-list col-10 col-md-8 mt-5">
      <div class="card-header">
        <h1>Listes des cartes</h1>
      </div>
      <div class="card-body">
          <cards />
      </div>
    </section>

  </div>
</template>

<script>
import Cards from '../components/Cards'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    Cards,
  },
  mounted() {
    this.reset()
  },
  methods: {
    // mapaction
    ...mapActions('decks', ['reset']),
  }
}
</script>

<style lang="scss" scoped>

  .home {
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

  }


</style>
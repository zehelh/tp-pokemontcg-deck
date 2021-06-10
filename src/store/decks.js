import axios from 'axios'

const cards = {
  namespaced: true,
  state() {
    return {
      url: 'http://tp-pokemon-deck.io/api/deck',
      deckTitle: '',
      isFav: false,
      isEditing: true,
      decks: {},
    }
  },
  mutations: {
    IS_EDITING(state, payload) {
      state.isEditing = payload;
    },
    CHANGE_DECK_TITLE(state, payload) {
      state.deckTitle = payload;
    },
    IS_FAV(state, payload) {
      state.isFav = payload;
    },
    UPDATE_DECKS(state, payload) {
      state.decks = payload;
    },
  },
  actions: {

    changeFav(context) {
      console.log(context.state.isFav)
      context.commit('IS_FAV', !context.state.isFav)
      console.log(context.state.isFav)
    },
    stopEdit(context, payload) {
      if(payload != '') {
        context.commit('CHANGE_DECK_TITLE', payload)
        context.commit('IS_EDITING', !context.state.isEditing)
      }
    },
    edit(context) {
      context.commit('IS_EDITING', !context.state.isEditing)
    },

    // GETTERS

    
    async getDecks(context) {
      const response = await axios.get(context.state.url);
      context.commit('UPDATE_DECKS', response.data);
      console.log(response.data)
    },

  }

}

export default cards
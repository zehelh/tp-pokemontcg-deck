import axios from 'axios'
import router from '@/router'

const cards = {
  namespaced: true,
  state() {
    return {
      url: 'https://tp-pokemon-deck.io/api/deck',
      deckTitle: '',
      deckId: '',
      isEditing: true,
      decks: {},
      cardList: {},
    }
  },
  mutations: {
    IS_EDITING(state, payload) {
      state.isEditing = payload;
    },
    CHANGE_DECK_TITLE(state, payload) {
      state.deckTitle = payload;
    },
    CHANGE_DECK_ID(state, payload) {
      state.deckId = payload;
    },
    UPDATE_DECKS(state, payload) {
      state.decks = payload;
    },
    UPDATE_CARD_LIST(state, payload) {
      state.cardList = payload;
    },
  },
  actions: {

    async stopEdit(context, payload) {
      if(payload != '') {
        if(router.currentRoute.value.name == "createDeck"){
          // Si il n'y a pas d'ID enregistrer, on créer le deck
          const item = {name: payload}
          try{
            const response = await axios.post(context.state.url, item)
            if(response.statusText === 'OK') {
              context.commit('CHANGE_DECK_TITLE', payload)
              context.commit('IS_EDITING', !context.state.isEditing)
              router.push({ path: `/edit-deck/${response.data.id}` });
            }
          } catch (e) {
            console.log(e);
          }
        } else {
          // Si il y a un ID, on edit
          const item = {name: payload, id:context.state.deckId}
          try{
            const response = await axios.put(context.state.url + `/${item.id}`, item)
            if(response.statusText === 'OK') {
              context.commit('CHANGE_DECK_TITLE', payload)
              context.commit('IS_EDITING', !context.state.isEditing)

            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    },

    edit(context) {
      context.commit('IS_EDITING', !context.state.isEditing)
    },

    reset(context) {
      context.commit('IS_EDITING', true)
      context.commit('CHANGE_DECK_TITLE', '');
      context.commit('CHANGE_DECK_ID', '');
    },

    totalCards(context) {
      let tmp = 0
        for (const key in context.state.cardList) {
          tmp += context.state.cardList[key].quantity
        }
      return tmp
    },

    async addCard(context, payload) {
      // On bloque l'ajout de carte dans le cas ou on est pas sur la route edit (pour prevent les actions sur la home comme le components cards est le meme)
      if(router.currentRoute.value.name == "editDeck") {
        let cards = ''
        await context.dispatch('totalCards')
        .then( function(e) {
          cards = e
        })
        // On bloque également l'ajout dans le cas ou le deck aurait 60 carte ( ou + ) pour ne pas depasser la limite imposer
        // La verification du 4 carte max par deck sauf energy ce fait coté backend pour eviter de faire une query supplémentaire ici voir screen '4 cartes max'
        if(cards < 60) {
          const cardInfo = await (await axios.get(`https://api.pokemontcg.io/v2/cards/${payload.card_id}`)).data.data
          let item = {
            deck_id: context.state.deckId,
            card_api_id: payload.card_id,
            name: payload.card_name,
            quantity: 1,
            supertype: cardInfo.supertype,
            status: 0
          }
          if(cards === 59) {
            item.status = 1
          }
          await axios.post(context.state.url + `/${item.deck_id}/card`, item)
          context.dispatch('getCardList', item.deck_id)
          // Set a refresh les pastille de quantité sur les cards, a voir comment il est possible de garder ou non les infos de recherche precedemment saisie
          context.dispatch('cards/getCards', 
          {info: {
            inputValue: '',
            sortType: '',
            sortRarity: '',
            sortCollection: '',
          }}, { root:true })
          
        }
      }
    },

    async decrementCard(context, payload) {
      const item = {
        deck_id: context.state.deckId,
        card_api_id: payload.card_api_id
      }
      await axios.put(context.state.url + `/${item.deck_id}/card`, item, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
      })
      context.dispatch('getCardList', item.deck_id)
    },

    // GETTERS

    
    async getDecks(context) {
      const response = await axios.get(context.state.url)
      context.commit('UPDATE_DECKS', response.data);
    },
    
    async findDeck(context, payload) {
      const response = await axios.get(context.state.url + `/${payload}`);
      context.commit('CHANGE_DECK_TITLE', response.data.name);
      context.commit('CHANGE_DECK_ID', response.data.id);
      context.commit('IS_EDITING', false)
    },
    
    async getCardList(context, payload) {
      const response = await axios.get(`http://tp-pokemon-deck.io/api/deck/${payload}/cards`)
      context.commit('UPDATE_CARD_LIST', response.data)
    },


  }

}

export default cards
import axios from 'axios'

const cards = {
  namespaced: true,
  state() {
    return {
      url: 'https://api.pokemontcg.io/v2',
      cards: {},
      request: '',
      types: {},
      collections: {},
      rarities: {},
      getCardsUrlOld: '',
      filterType: '',
      filterRarity: '',
      filterSet: '',
      search: '',
    }
  },
  mutations: {
    UPDATE_CARDS(state, payload) {
      state.cards = payload;
    },
    UPDATE_TYPES(state, payload) {
      state.types = payload;
    },
    UPDATE_RARITIES(state, payload) {
      state.rarities = payload;
    },
    UPDATE_COLLECTIONS(state, payload) {
      state.collections = payload;
    },
  },
  actions: {

    // GETTERS

    // START getCards
    async getCards(context, payload) {
      // API KEY
      axios.defaults.headers.common = {
        "X-API-Key": "866edf55-e35e-4a94-bcd1-b9dd61e60acd",
      };
      // On verifie si payload est bien initialisé ou non (par pagination, recherches ou filtres) sinon on l'initialise sans filtres ni recherche a la page 1
      if (payload === undefined) {

        payload = {}

        payload.page = 1;
        context.state.request = context.state.url + `/cards?page=${payload.page}&pageSize=50?&q=`

        context.state.getCardsUrlOld = context.state.request

      }

      if (payload.page) {
        context.state.request = context.state.request.replace(/page=[0-9]+/, `page=${payload.page}`)
      }

      // Initialisation de la recherche
      if (payload.inputValue) {
        if(context.state.request.includes('name')){
          context.state.request = context.state.request.replace(/name:\*[a-zA-Z]+\*/, `name:*${payload.inputValue}*`)
        } else {
          context.state.request += ` name:*${payload.inputValue}*`
        }
      }
      if(context.state.request.includes('name') && !payload.inputValue) {
        context.state.request = context.state.request.replace(/name:\*[a-zA-Z]+\*/, '')
      }

      // Initialisation des filtres
      if (payload.sortType) {
        if(context.state.request.includes('types')){
          context.state.request = context.state.request.replace(/types:[a-zA-Z]+/, `types:${payload.sortType}`)
        } else {
          context.state.request += ` types:${payload.sortType}`
        }
      }
      if (payload.sortRarity) {
        if(context.state.request.includes('rarity')){
          context.state.request = context.state.request.replace(/rarity:\w+(?:\.*\w*)*/, `rarity:${payload.sortRarity.replaceAll(" ", ".")}`)
          console.log(context.state.request)
        } else {
          context.state.request += ` rarity:${payload.sortRarity.replaceAll(" ", ".")}`
        }
      }
      if (payload.sortCollection) {
        console.log('COLLECTIONS: ' + payload.sortCollection)
        // context.state.request += `?&q=sets:${payload.sortCollection}`
        // context.state.request = context.state.url + `/cards&q=sets:base1`
        if(context.state.request.includes('set')){
          context.state.request = context.state.request.replace(/set:\w+(?:\.*\w*)*/, `set:${payload.sortCollection.replaceAll(" ", ".")}`)
          console.log(context.state.request)
        } else {
          context.state.request += ` set:${payload.sortCollection.replaceAll(" ", ".")}`
        }
      }

      // context.state.getCardsUrlOld = context.state.request

      const response = await axios.get(context.state.request);
      context.commit('UPDATE_CARDS', response.data);

      console.log('___PAGE___ ' + payload.page)
      console.log('___URL___  ' + context.state.request)
      console.log('___DATA___ ' + response.data);
    },
    // END getCards


    // START getTypes
    async getTypes(context) {
      // API KEY
      axios.defaults.headers.common = {
        "X-API-Key": "866edf55-e35e-4a94-bcd1-b9dd61e60acd",
      };
      const response = await axios.get(context.state.url + '/types');
      context.commit('UPDATE_TYPES', response.data);
    },
    // END getTypes


    // START getTypes
    async getRarities(context) {
      // API KEY
      axios.defaults.headers.common = {
        "X-API-Key": "866edf55-e35e-4a94-bcd1-b9dd61e60acd",
      };
      const response = await axios.get(context.state.url + '/rarities');
      context.commit('UPDATE_RARITIES', response.data);
    },
    // END getTypes


    // START getTypes
    async getCollections(context) {
      // API KEY
      axios.defaults.headers.common = {
        "X-API-Key": "866edf55-e35e-4a94-bcd1-b9dd61e60acd",
      };
      const response = await axios.get(context.state.url + '/sets');
      context.commit('UPDATE_COLLECTIONS', response.data);
    },
    // END getTypes

    // START applyFilter
    applyFilter(context, payload) {
      console.log(context)
      console.log(payload)
      if(payload.context.state.request.includes(payload.name)){
        let regex = `/ ${payload.name}:[a-zA-Z]+/`
        payload.context.state.request = payload.context.state.request.replace(regex, ` ${payload.name}:*${payload.value.replaceAll(" ", ".")}*`)
      } else {
        payload.context.state.request += ` ${payload.name}:*${payload.value.replaceAll(" ", ".")}*`
      }
    }
    // END applyFilter




  }

}

export default cards
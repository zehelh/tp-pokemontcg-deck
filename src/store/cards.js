import axios from 'axios'

const cards = {
  namespaced: true,
  state() {
    return {
      url: 'https://api.pokemontcg.io/v2',
      cards: {},
      oldUrl: '',
      types: {},
      collections: {},
      rarities: {},
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

      let url = context.state.url + `/cards?page=1&pageSize=10?&q=`

      // On verifie si payload est bien initialisé ou non (par pagination, recherches ou filtres)
      if (payload === undefined) {
        payload = {}
      }

      // Initialisation de la recherche
      if (payload.inputValue) {
        url += ` name:*${payload.inputValue}*`
      }

      // Initialisation des filtres
      if (payload.sortType) {
        url += ` types:${payload.sortType}`
      }

      if (payload.sortRarity) {        
        url += ` rarity:${payload.sortRarity.replace(/\s+/g, ".")}`
      }

      if (payload.sortCollection) {
        url += ` set.id:${payload.sortCollection}`
      }

      // RESET FILTER
      // Reset de la recherche
      if(url.includes('name') && !payload.inputValue) {
        url = url.replace(/name:\*[a-zA-Z]+\*/, '')
      }
      // Reset du filtre types
      if(url.includes('types') && !payload.sortType) {
        url = url.replace(/types:[a-zA-Z]+/, '')
      }
      // Reset du filtre rarity
      if(url.includes('rarity') && !payload.sortRarity) {
        url = url.replace(/rarity:[a-zA-Z]+/, '')
      }
      // Reset du filtre set
      if(url.includes('set') && !payload.sortCollection) {
        url = url.replace(/set.id:[a-zA-Z0-9]+/, '')
      }
      

      // Initialisation de la pagination
      if (payload.page > 1) {
        url = context.state.oldUrl.replace(/\?page=[0-9]+/, `?page=${payload.page}`)
      }

      const response = await axios.get(url);
      context.commit('UPDATE_CARDS', response.data);
      // On fais un backup de la request pour pouvoir la garder en mémoire pour agir sur la pagination sans perdre les filtres
      context.state.oldUrl = url
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
      if(payload.url.includes(payload.name)){
        let regex = `/ ${payload.name}:[a-zA-Z]+/`
        payload.url = payload.url.replace(regex, ` ${payload.name}:*${payload.value.replaceAll(" ", ".")}*`)
      } else {
        payload.url += ` ${payload.name}:*${payload.value.replaceAll(" ", ".")}*`
      }
    }
    // END applyFilter




  }

}

export default cards
import { createStore } from 'vuex'
import products from './products'
import alert from './alert'
import product from './product'
import comments from './comments'
import contact from './contact'
import users from './users'

const store = createStore({
  modules: {
    products,
    alert,
    product,
    comments,
    contact, 
    users
  }
})

export default store
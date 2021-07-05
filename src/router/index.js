import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MyDecks from '../views/MyDecks.vue'
import CreateDeck from '../views/CreateDeck.vue'


 const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/my-decks',
      name: 'myDecks',
      component: MyDecks
    },
    {
      path: '/create-deck',
      name: 'createDeck',
      component: CreateDeck
    },
    {
      path: '/edit-deck/:id',
      name: 'editDeck',
      component: CreateDeck, 
      props: true
    },
  ],
  history: createWebHistory(),
  linkActiveClass: 'active'
})

export default router

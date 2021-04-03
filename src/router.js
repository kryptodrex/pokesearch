import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PokePage from './views/PokemonPage.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pokemon',
      name: 'pokePage',
      component: PokePage
    },
    {
      path: '/pokemon/:name',
      name: 'pokePageDirect',
      component: PokePage
    },
    {
      path: '/lost-in-the-tall-grass',
      name: 'gotLost',
      component: NotFound
    }
  ]
})

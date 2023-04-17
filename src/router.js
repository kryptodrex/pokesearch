import Vue from 'vue'
import Router from 'vue-router'
import HomeView from './views/HomeView.vue'
import PokemonView from './views/PokemonView.vue'
import TypeView from './views/TypeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: '/',
  routes: [
    {
      path: '/pokemon',
      redirect: '/',
      name: 'homePokemon'
    },
    {
      path: '/pokemon/:name',
      name: 'pokePageDirect',
      component: PokemonView
    },
    {
      path: '/pokemon/:name/forms',
      name: 'pokePageForms',
      component: PokemonView
    },
    {
      path: '/pokemon/:name/forms/:form',
      name: 'pokePageAltForm',
      component: PokemonView
    },
    {
      path: '/types',
      redirect: '/'
    },
    {
      path: '/types/:name',
      name: 'typePageDirect',
      component: TypeView
    },
    {
      path: '/lost-in-the-tall-grass',
      name: 'gotLost',
      component: NotFoundView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '*',
      name: 'default',
      component: HomeView
    }
  ]
  // scrollBehavior (to, from, savedPosition) {
  //   if (to.hash) {
  //     return {
  //       selector: to.hash,
  //       behavior: 'smooth'
  //       // , offset: { x: 0, y: 10 }
  //     }
  //   } else if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})

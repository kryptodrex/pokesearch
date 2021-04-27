import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Pokemon from './views/Pokemon.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/pokemon',
      name: 'homePokemon',
      component: Home
    },
    {
      path: '/pokemon/:name',
      name: 'pokePageDirect',
      component: Pokemon
    },
    {
      path: '/pokemon/:name/forms',
      name: 'pokePageDirect',
      component: Pokemon
    },
    {
      path: '/pokemon/:name/forms/:form',
      name: 'pokePageAltForm',
      component: Pokemon
    },
    {
      path: '/lost-in-the-tall-grass',
      name: 'gotLost',
      component: NotFound
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      name: 'default',
      component: Home
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

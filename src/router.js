import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import PokemonView from './views/PokemonView.vue'
import TypeView from './views/TypeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/pokemon', redirect: '/', name: 'homePokemon' },
    { path: '/pokemon/:name', name: 'pokePageDirect', component: PokemonView },
    { path: '/pokemon/:name/forms', name: 'pokePageForms', component: PokemonView },
    { path: '/pokemon/:name/forms/:form', name: 'pokePageAltForm', component: PokemonView },
    { path: '/types', redirect: '/' },
    { path: '/types/:name', name: 'typePageDirect', component: TypeView },
    { path: '/lost-in-the-tall-grass', name: 'gotLost', component: NotFoundView },
    { path: '/', name: 'home', component: HomeView },
    { path: '/:pathMatch(.*)*', name: 'default', component: HomeView }
  ]
})

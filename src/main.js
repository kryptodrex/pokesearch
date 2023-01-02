import { createApp } from '@vitejs/plugin-vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import store from './store'

import Home from '@/views/Home.vue'
import Pokemon from '@/views/Pokemon.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  store: store,
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
      name: 'pokePageForms',
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
})

createApp(App)
  .use(router)
  .mount('#app')

// Vue.config.productionTip = false
// // Vue.mixin(titleMixin)

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

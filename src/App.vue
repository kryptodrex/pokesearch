<template>
  <div id="app">
    <AppHeader />
    <main>
      <router-view/>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const util = RepositoryFactory.get('util')

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  mounted () {
    console.log(util.getUserLocales())
  }
}
</script>

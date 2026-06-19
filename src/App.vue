<template>
  <div id="app">
    <Header />
    <main>
      <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script>
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const util = RepositoryFactory.get('util')

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted () {
    console.log(util.getUserLocales())
  }
}
</script>

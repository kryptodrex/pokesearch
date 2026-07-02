<template>
  <div class="gotLost">
    <h2>404 Not Found</h2>
    <p class="">Whatever you were searching for couldn't be found...</p>
    <router-link :to="'/'">
        <AppButton color="ps-red" size="large"> Head back home? </AppButton>
    </router-link>
  </div>
</template>

<script>
// import router from '@/router'
import AppButton from '@/components/AppButton'

export default {
  name: 'NotFoundView',
  components: {
    AppButton
  },
  // created () {
  //   this.getAlternatives()
  // },
  // methods: {
  //   getAlternatives () {
  //     var routes = this.$router
  //     console.log(routes)
  //   }
  // }
  watch: {
    $route: function (to, from) {
      console.log(to, from)
    }
  }
}
</script>

<style scoped>

.gotLost {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80vh;
}

.pokemon-image {
    margin-top: 1rem;
    height: 10rem;
}

</style>

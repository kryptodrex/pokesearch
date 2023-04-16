<template>
  <div class="gotLost">
    <h2>404 Not Found</h2>
    <p class="">Whatever you were searching for couldn't be found...</p>
    <router-link :to="'/'">
        <Button color="ps-red" size="large"> Head back home? </Button>
    </router-link>
  </div>
</template>

<script>
// import router from '@/router'
import Button from '@/components/Button'

export default {
  name: 'NotFoundView',
  components: {
    Button
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

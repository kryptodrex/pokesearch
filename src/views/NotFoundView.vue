<template>
  <div class="gotLost">
    <h2>404 Not Found</h2>
    <p class="">Whatever you were searching for couldn't be found...</p>
    <router-link :to="'/'">
        <CustomButton color="ps-red" size="large"> Head back home? </CustomButton>
    </router-link>
  </div>
</template>

<script>
// import router from '@/router'
import CustomButton from '@/components/CustomButton'

export default {
  name: 'NotFoundView',
  components: {
    CustomButton
  }
  // created () {
  //   this.getAlternatives()
  // },
  // methods: {
  //   getAlternatives () {
  //     var routes = this.$router
  //     console.log(routes)
  //   }
  // }

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

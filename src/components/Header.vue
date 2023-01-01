<template>
  <header>
    <div class="header-text">
        <router-link to="/">
            <img class="logo" src="../assets/images/pokesearch-icon.svg" alt="PokeSearch Logo">
        </router-link>
        <h1 class="site-name">PokéSearch</h1>
        <h4 class="site-name">&nbsp; beta</h4>
        <!-- Take out 'beta' once it is v1.0! -->
    </div>

    <!-- <div class="header-search" v-if="!isHomeRoute && !isHome">
        <Search class="header-search-input" placeholder="Search..." v-on:searching="setSearchedPokemon($event)" :hasAutosuggest="false" />
        <CustomButton size="medium" color="white"> GO! </CustomButton>
    </div> -->
  </header>
</template>

<script>
import router from '@/router'
// import CustomButton from '@/components/CustomButton'
// import Search from '@/components/Search'

export default {
  name: 'Header',
  // components: {
  //   CustomButton,
  //   Search
  // },
  data () {
    return {
      isHomeRoute: false
    }
  },
  methods: {
    setSearchedPokemon (e) {
      console.log(e)
    }
  },
  computed: {
    isHome () {
      var route = router.currentRoute.name
      // console.log(route)
      if (route === 'home') return true
      else return false
    }
  },
  watch: {
    $route: function (to, from) {
      if (to.name === 'home') this.isHomeRoute = true
      else this.isHomeRoute = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
header {
    width: auto;
    padding: 1rem;
    margin: 0.5rem 0 1rem;
    /* margin-bottom: 1rem; */
    background-color: rgb(201, 38, 63);
    border-radius: 0.625rem;
    color: white;

    display: flex;
    flex-direction: row;
    align-items: center;
}

.header-text {
    flex-grow: 3;

    display: flex;
    align-items: center;
}

.logo {
    height: 3rem;
    margin-right: 1rem;
}

h1 {
  font-size: 1.7rem;
}
.site-name {
    margin: 0;
    /* display: none; */
    font-family: 'QSMed', Arial, Helvetica, sans-serif;
}

.header-search {
    display: flex;
    flex-direction: row;
}

.header-search-input {
    margin-right: 0.5rem;
}

@media screen and (max-width: 22.25rem) {
    .header-text {
        width: 100%;
        justify-content: center;
        text-align: center;
    }

    .logo {
        height: 2rem;
        margin: 0 0 0.2rem 0;
    }

    .header-pokepage {
        display: flex;
        flex-direction: column;
    }
}

/* Styling for desktop/tablet viewing */
@media screen and (min-width: 25.9375rem) {
  header {
    /* margin: 0.7rem;
    margin-bottom: 0; */
  }

  h1 {
    font-size: 2rem;
  }
}
</style>

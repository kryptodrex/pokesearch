<template>
  <header>
    <div class="header-text">
        <router-link to="/">
            <img class="logo" src="../assets/images/pokesearch-icon.svg" alt="PokeSearch Logo">
        </router-link>
        <h1 class="site-name">PokéSearch</h1>
        <h4 v-if="env == 'dev'" class="site-name">&nbsp; beta</h4>
    </div>
  </header>
</template>

<script>
import { useHistoryStore } from '@/stores/history'

export default {
  name: 'Header',
  data () {
    return {
      isHomeRoute: false,
      env: ''
    }
  },
  mounted () {
    this.env = import.meta.env.VITE_APP_ENV
  },
  methods: {
    setSearchedPokemon (e) {
      console.log(e)
    }
  },
  computed: {
    isHome () {
      return this.$route.name === 'home'
    }
  },
  watch: {
    $route: function (to, from) {
      const historyStore = useHistoryStore()
      historyStore.addIdToHistory(to.fullPath)

      if (to.name === 'home') this.isHomeRoute = true
      else this.isHomeRoute = false
    }
  }
}
</script>

<style scoped lang="scss">
header {
  width: auto;
  padding: $space-md;
  margin: $space-sm 0 $space-md;
  background-color: $color-primary;
  border-radius: $radius-md;
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
  margin-right: $space-md;
}

h1 {
  font-size: 1.7rem;
}

.site-name {
  margin: 0;
  font-family: $font-bold;
}

.header-search {
  display: flex;
  flex-direction: row;
}

.header-search-input {
  margin-right: $space-sm;
}

@media screen and (max-width: $bp-sm) {
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

@media screen and (min-width: $bp-md) {
  h1 {
    font-size: 2rem;
  }
}
</style>

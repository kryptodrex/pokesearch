<template>
  <div class="home">

    <div class="content">

      <div class="filterBtns">
        <div class="genBtns" v-for="(gen, index) in generations" :key="index" v-on:click="changeGeneration(getIndex(gen.url))" :aria-label="'Click to load ' +  getGeneration(gen.name) + ' Pokémon'">
          <!-- Buttons for other unselected generations -->
          <Button size="medium" color="ps-red" v-if="getIndex(gen.url) != genToSearch" > {{ getGeneration(gen.name) }} </Button>
          <!-- Button for selected generation -->
          <Button size="medium" color="ps-red" :inverted="true" v-if="getIndex(gen.url) == genToSearch" > {{ getGeneration(gen.name) }} </Button>
        </div>
      </div>

      <div class="searchInput">
        <Search placeholder="Start typing a name..." v-on:searching="setSearchedPokemon($event)" :hasClear="true" />
        <p class="error" v-if="pokeInfo.length == 0 && !isLoading">No matching Pokémon found!</p>
      </div>

      <div class="pokeBoxes">
        <PokeBox v-for="(poke, index) in sortedPokeInfo" :key="index" :dexNum="getIndex(poke.url)" :name="poke.name" />
      </div>

    </div>

    <div class="loadMore" v-on:click="getNextGen()" :aria-label="'Click to load ' +  getGeneration(nextGen.name) + ' Pokémon'" v-if="nextGen != null">
      <Button id="loadMoreBtn" size="medium" color="red" v-if="!isLoading && nextGen != null && !searching"> Load {{ getGeneration(nextGen.name) }} </Button>
      <Loader v-if="isLoading" size="large" :full-page="true" />
    </div>
  </div>
</template>

<script>

import router from '@/router'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import PokeBox from '@/components/pokemon/PokeBox'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import Search from '@/components/Search'

const pokeApi = RepositoryFactory.get('pokeApi')
const util = RepositoryFactory.get('util')

export default {
  name: 'Home',
  components: {
    PokeBox,
    Loader,
    Button,
    Search
  },
  data () {
    return {
      isLoading: false,
      searching: false,
      pokeInfo: [],
      generations: [],
      genToSearch: router.currentRoute.query.gen,
      nextGen: { name: 'generation-ii' },
      limit: 30,
      offset: 0,
      disable: false,
      locales: [],
      navigating: false,
      title: 'PokéSearch'
    }
  },
  mounted () {
    document.title = this.title
    this.fetch()
    this.locales = util.getUserLocales()
  },
  methods: {
    fetch () {
      this.getPokemon()
    },

    changeGeneration (gen) {
      this.genToSearch = gen
      var currentRoute = this.$router.currentRoute
      if (currentRoute.query.gen != gen) {
        this.pokeInfo = []
        this.$router.push({ name: 'homePokemon', query: { gen: gen } })
        this.getPokemon()
      }
    },

    async getPokemon () {
      this.isLoading = true

      var { data } = await pokeApi.getAllGenerations()
      this.generations = data.results

      var latestGen = this.getIndex(this.generations[this.generations.length - 1].url)
      // var latestGen = 'generation-i';

      if (this.genToSearch == null) this.genToSearch = latestGen

      this.nextGen = this.setNextGen()

      var { data } = await pokeApi.getGeneration(this.genToSearch)

      data.pokemon_species.forEach(species => {
        this.pokeInfo = this.pokeInfo.concat([{
          name: species.name,
          url: species.url,
          index: this.getIndex(species.url)
        }])
      })

      this.isLoading = false
    },

    getNextGen () {
      this.genToSearch = this.getIndex(this.nextGen.url)
      this.getPokemon()
    },

    setSearchedPokemon (e) {
      this.searching = true

      if (e[0] == 'clear') {
        this.searching = false
        this.pokeInfo = []
        this.fetch()
      } else {
        this.pokeInfo = e
      }
    },

    setNextGen () {
      for (var i = 0; i < this.generations.length; i++) {
        if (this.getIndex(this.generations[i].url) == this.genToSearch) {
          var nextgen = this.generations[i + 1]
          if (nextgen == null) return null
          else return nextgen
        }
      }
    },

    getIndex (url) {
      return util.getId(url)
    },

    getGeneration (gen) {
      if (gen != null) {
        var split = gen.split('-')
        return 'Gen ' + split[1].toUpperCase()
      } else return ''
    }

    // async getPokemon() {
    //   var { data } = await pokeApi.getPagedPokemonSpecies(this.limit, this.offset);
    //   this.setNextPaging(data.next);
    //   this.pokeInfo = this.pokeInfo.concat(data.results);
    // },

    // async getGenerations() {
    //   var { gens } = await pokeApi.getAllGenerations();
    //   this.generations = gens.results;
    // },

    // setNextPaging(nextUrl) {
    //   var splitUrl = nextUrl.split("?")[1].split("&");
    //   this.limit = splitUrl[1].split("=")[1];
    //   this.offset = splitUrl[0].split("=")[1];
    // },

  },

  computed: {
    sortedPokeInfo () {
      const tempPokeInfo = this.pokeInfo

      tempPokeInfo.sort(function (a, b) {
        return a.index - b.index
      })

      return tempPokeInfo
    }
  }

  // watch: {
  //   $route: function (to, from) {
  //     this.genToSearch = null

  //     this.genToSearch = to.query.gen

  //     this.navigating = true
  //     // location.reload()
  //   }
  // }
}
</script>

<style scoped lang="css">

.content {
  display: flex;
  flex-direction: column;
}

.filterBtns {
  display: flex;
  flex-direction: row;
  overflow: scroll;
  margin-bottom: 1rem;
}
.genBtns {
  margin: 0 1rem;
}

.searchInput {
  margin-bottom: 0.5rem;
}

.pokeBoxes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.loadMore {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Styling for desktop/tablet viewing */
@media screen and (min-width: 25.9375rem) {
  .filterBtns {
    overflow: visible;
    justify-content: center;
  }
}

</style>

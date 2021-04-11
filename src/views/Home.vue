<template>
  <div class="home">

    <div class="content">

      <div class="filterBtns">
        <div v-for="gen in generations" :key="gen.name" v-on:click="changeGeneration(gen.name)">
          <Button size="medium" color="red"> {{ getGeneration(gen.name) }} </Button>
        </div>
      </div>

      <div class="searchbar">
        <input class="search-input" type="text" value="" placeholder="Start typing a name...">
      </div>

      <div class="pokeBoxes" v-if="!isLoading">
        <PokeBox v-for="(poke, index) in pokeInfo" :key="index" :dexNum="getIndex(poke.url)" :name="poke.name" />
      </div>

    </div>

    <Loader v-if="isLoading" />
    
    <div class="loadMore" v-on:click="getMorePokemon('generation-ii')">
      <Button id="loadMoreBtn" size="medium" color="red" v-if="(!loadingMore && !isLoading) || nextGen != null"> Load more! </Button>
      <Loader v-if="loadingMore" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import PokeBox from '@/components/PokeBox'
import Loader from '@/components/Loader';
import Button from '@/components/Button';

const pokeApi = RepositoryFactory.get('pokeApi')
const util = RepositoryFactory.get('util');

export default {
  name: 'Home',
  components: {
    PokeBox,
    Loader,
    Button
  },
  data () {
    return {
      isLoading: false,
      loadingMore: false,
      pokeInfo: [],
      generations: [],
      genToSearch: null,
      nextGen: null,
      limit: 30,
      offset: 0,
      disable: false,
      locales: []
    }
  },
  created () {
    this.fetch()
    this.locales = util.getUserLocales();
  },
  methods: {
    fetch () {
      this.getPokemon()
    },

    changeGeneration(gen) {
      this.genToSearch = gen;
      this.pokeInfo = [];
      this.getPokemon();
    },

    async getPokemon() {
      // this.isLoading = true

      var { data } = await pokeApi.getAllGenerations();
      this.generations = data.results;
      // var latestGen = this.generations[this.generations.length - 1].name;
      var latestGen = 'generation-i';

      if (this.genToSearch == null) this.genToSearch = latestGen;

      this.nextGen = this.setNextGen();

      var { data } = await pokeApi.getGeneration(this.genToSearch);
      
      // var pokeList = [];
      data.pokemon_species.forEach(species => {
        this.pokeInfo = this.pokeInfo.concat([{
          name: species.name,
          url: species.url,
          index: this.getIndex(species.url)
        }])
      })

      this.pokeInfo.sort(function (a,b) {
        return a.index - b.index;
      })

      // this.pokeInfo = this.pokeInfo.concat(pokeList);

      // this.isLoading = false
    },

    getMorePokemon() {
      // this.loadingMore = true
      this.genToSearch = this.nextGen
      this.getPokemon()
      // this.loadingMore = false
    },

    // async getPokemon() {
    //   var { data } = await pokeApi.getPagedPokemonSpecies(this.limit, this.offset);
    //   this.setNextPaging(data.next);
    //   this.pokeInfo = this.pokeInfo.concat(data.results);
    // },

    // async getGenerations() {
    //   var { gens } = await pokeApi.getAllGenerations();
    //   this.generations = gens.results;
    // },

    setNextPaging(nextUrl) {
      var splitUrl = nextUrl.split("?")[1].split("&");
      this.limit = splitUrl[1].split("=")[1];
      this.offset = splitUrl[0].split("=")[1];
    },

    setNextGen() {
      for (var i = 0; i < this.generations.length; i++) {
        if (this.generations[i].name == this.genToSearch) {
          return this.generations[i + 1].name
        }
      }
    },

    getIndex(url) {
      var splitUrl = url.split("/");
      return splitUrl[6];
    },

    getGeneration(gen) {
      var split = gen.split("-");
      return 'Gen ' + split[1].toUpperCase();
      // var { data } = await pokeApi.getGeneration(gen);
      // this.generation = data.names[0].name;
    }

  }
}
</script>

<style lang="scss">

.content {
  display: flex;
  flex-direction: column;
}

.filterBtns {
  display: none;
}

.search-input {
  border: 2px solid #707070;
  border-radius: 0.625rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  line-height: 1.8rem;
  font-size: 1.2rem;
  width: 100%;
  transition: 0.3s;
}
.search-input:hover {
    border: 2px solid rgb(201, 38, 63);
    transition: 0.3s;
}
.search-input:focus {
    border: 2px solid rgb(201, 38, 63);
    transition: 0.3s;
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

a {
  text-decoration: none;
  color: #4A4A4A;
  cursor: pointer;
}


/* Styling for desktop/tablet viewing */
@media screen and (min-width: 25.9375rem) {
  .filterBtns {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1rem;
  }
}

</style>


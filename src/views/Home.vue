<template>
  <div class="home">
    <Loader v-if="isLoading" />

    <div class="content">
      <div class="searchbar">
        <input class="search-input" type="text" value="" placeholder="Start typing a name...">
      </div>

      <div class="pokeBoxes" v-if="!isLoading">  
        <PokeBox v-for="(poke, index) in pokeInfo" :key="index" :dexNum="getIndex(poke.url)" :name="poke.name" />
      </div>
    </div>
    
    <div class="loadMore" v-on:click="getMorePokemon()">
      <Button id="loadMoreBtn" text="Load more!" size="medium" color="red" v-if="!loadingMore" />
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
      limit: 30,
      offset: 0,
      disable: false
    }
  },
  created () {
    this.fetch()
    util.setUserLocales()
    console.log(util.getUserLocales());
  },
  methods: {
    fetch () {
      this.isLoading = true
      this.getPokemon()
      this.isLoading = false
    },

     getMorePokemon() {
      this.loadingMore = true
      this.getPokemon()
      this.loadingMore = false
    },

    async getPokemon() {
      const { data } = await pokeApi.getPagedPokemonSpecies(this.limit, this.offset);
      this.setNextPaging(data.next);
      this.pokeInfo = this.pokeInfo.concat(data.results);
    },

    setNextPaging(nextUrl) {
      var splitUrl = nextUrl.split("?")[1].split("&");
      this.limit = splitUrl[1].split("=")[1];
      this.offset = splitUrl[0].split("=")[1];
    },

    getIndex(url) {
      var splitUrl = url.split("/");
      return splitUrl[6];
    }

  }
}
</script>

<style lang="scss">

.content {
  display: flex;
  flex-direction: column;
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

</style>


<template>
  <div class="home">
    <Loader v-if="isLoading" />
    <div class="pokeBoxes" v-if="!isLoading">  
      <PokeBox v-for="poke in pokeInfo" :key="poke.id" :name="poke.name" :url="poke.url" />
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

const PokeRepository = RepositoryFactory.get('pokeApi')

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
      const { data } = await PokeRepository.getAllPokemonSpecies(this.limit, this.offset);
      this.setNextPaging(data.next);
      this.pokeInfo = this.pokeInfo.concat(data.results);
      // this.limit += this.limit
    },

    setNextPaging(nextUrl) {
      var splitUrl = nextUrl.split("?")[1].split("&");
      this.limit = splitUrl[1].split("=")[1];
      this.offset = splitUrl[0].split("=")[1];
    }

  },
  computed: {
    computedPosts () {
      return this.posts.slice(0, 10)
    }
  }
}
</script>

<style lang="scss">

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


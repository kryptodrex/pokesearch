<template>
  <div class="pokepage">
    <Loader v-if="isLoading" />
    <div class="pokemonInfo">
      {{ speciesInfo }}
    </div>
  </div>
</template>

<script>
  // import axios, { AxiosResponse } from 'axios';
  import router from '../router';
  import { RepositoryFactory } from './../repositories/repositoryFactory';
  import Loader from '@/components/Loader';
  
  const PokeRepository = RepositoryFactory.get('pokes');

  export default {

    name: 'PokePage',
    components: {
      Loader
    },
    data() {
      return {
        isLoading: false,
        speciesInfo: null,
        pokeInfo: null,
      };
    },
    created () {
      this.fetch()
    },
    methods: {
      async fetch () {
        const pokemon = router.currentRoute.params.name
        this.isLoading = true
        const { data } = await PokeRepository.getPokemonSpecies(pokemon)
        const { data2 } = await PokeRepository.getPokemon(pokemon)
        this.isLoading = false
        this.speciesInfo = data;
        this.pokeInfo = data2;

      }
    },
    computed: {
      computedPosts () {
        return this.posts.slice(0, 10)
      }
    }

  }
</script>

<style>
  
</style>
<template>
  <div class="pokepage">
    <div id="loading" class="loading" v-if="isLoading">
        <img class="loader" id="loader" src="../assets/images/pokesearch-logo.svg" alt="">
    </div>
    <div class="pokemonInfo">
      {{ speciesInfo }}
    </div>
  </div>
</template>

<script>
  // import axios, { AxiosResponse } from 'axios';
  import router from '../router';
  import { RepositoryFactory } from './../repositories/repositoryFactory';
  const PokeRepository = RepositoryFactory.get('pokes');

  export default {

    name: 'PokePage',

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
    /* Loading styling */
  .loading {
      text-align: center;
      margin: 0 auto;
  }
  .loader {
    height: 6rem;
      
    animation: foresight_load 3000ms linear both;
    animation-iteration-count: infinite;
  }
  @keyframes foresight_load {
    0.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1); }
    1.11% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.057, 0.057, 1, 1); }
    2.22% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.46, 0.46, 1, 1); }
    3.33% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1.6, 1.6, 1, 1); }
    4.44% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3.764, 3.764, 1, 1); }
    5.56% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 7.319, 7.319, 1, 1); }
    6.67% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 12.8, 12.8, 1, 1); }
    7.78% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 20.239, 20.239, 1, 1); }
    8.89% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 29.499, 29.499, 1, 1); }
    10.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 37.2, 37.2, 1, 1); }
    11.11% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 42.548, 42.548, 1, 1); }
    12.22% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 46.15, 46.15, 1, 1); }
    13.33% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 48.4, 48.4, 1, 1); }
    14.44% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 49.519, 49.519, 1, 1); }
    15.56% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 49.937, 49.937, 1, 1); }
    16.67% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, 50, 2, 1); }
    17.78% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, 49.885, 2, 1); }
    18.89% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, 49.08, 2, 1); }
    20.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, 46.8, 2, 1); }
    21.11% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, 42.472, 2, 1); }
    22.22% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, 35.362, 2, 1); }
    23.33% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, 24.4, 2, 1); }
    24.44% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, 9.522, 2, 1); }
    25.56% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, -8.999, 2, 1); }
    26.67% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, -24.4, 2, 1); }
    27.78% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, -35.096, 2, 1); }
    28.89% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, -42.3, 2, 1); }
    30.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, -46.8, 2, 1); }
    31.11% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, -49.038, 2, 1); }
    32.22% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, -49.874, 2, 1); }
    33.33% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, -50, 3, 1); }
    34.44% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 49.885, -49.885, 3, 1); }
    35.56% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 49.08, -49.08, 3, 1); }
    36.67% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 46.8, -46.8, 3, 1); }
    37.78% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 42.472, -42.472, 3, 1); }
    38.89% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 35.362, -35.362, 3, 1); }
    40.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 24.4, -24.4, 3, 1); }
    41.11% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 9.522, -9.522, 3, 1); }
    42.22% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -8.999, 8.999, 3, 1); }
    43.33% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.4, 24.4, 3, 1); }
    44.44% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -35.096, 35.096, 3, 1); }
    45.56% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -42.3, 42.3, 3, 1); }
    46.67% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -46.8, 46.8, 3, 1); }
    47.78% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -49.038, 49.038, 3, 1); }
    48.89% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -49.874, 49.874, 3, 1); }
    50.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, 50, 4, 1); }
    51.11% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, 49.885, 4, 1); }
    52.22% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, 49.08, 4, 1); }
    53.33% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, 46.8, 4, 1); }
    54.44% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, 42.472, 4, 1); }
    55.56% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, 35.362, 4, 1); }
    56.67% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, 24.4, 4, 1); }
    57.78% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, 9.522, 4, 1); }
    58.89% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, -8.999, 4, 1); }
    60.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, -24.4, 4, 1); }
    61.11% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, -35.096, 4, 1); }
    62.22% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, -42.3, 4, 1); }
    63.33% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, -46.8, 4, 1); }
    64.44% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, -49.038, 4, 1); }
    65.56% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, -49.874, 4, 1); }
    66.67% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, -50, 5, 1); }
    67.78% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -49.885, -49.885, 5, 1); }
    68.89% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -49.08, -49.08, 5, 1); }
    70.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -46.8, -46.8, 5, 1); }
    71.11% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -42.472, -42.472, 5, 1); }
    72.22% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -35.362, -35.362, 5, 1); }
    73.33% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.4, -24.4, 5, 1); }
    74.44% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -9.522, -9.522, 5, 1); }
    75.56% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 8.999, 8.999, 5, 1); }
    76.67% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 24.4, 24.4, 5, 1); }
    77.78% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 35.096, 35.096, 5, 1); }
    78.89% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 42.3, 42.3, 5, 1); }
    80.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 46.8, 46.8, 5, 1); }
    81.11% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 49.038, 49.038, 5, 1); }
    82.22% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 49.874, 49.874, 5, 1); }
    83.33% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, 50, 6, 1); }
    84.44% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 49.943, 49.943, 6, 1); }
    85.56% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 49.54, 49.54, 6, 1); }
    86.67% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 48.4, 48.4, 6, 1); }
    87.78% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 46.236, 46.236, 6, 1); }
    88.89% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 42.681, 42.681, 6, 1); }
    90.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 37.2, 37.2, 6, 1); }
    91.11% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 29.761, 29.761, 6, 1); }
    92.22% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 20.501, 20.501, 6, 1); }
    93.33% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 12.8, 12.8, 6, 1); }
    94.44% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 7.452, 7.452, 6, 1); }
    95.56% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3.85, 3.85, 6, 1); }
    96.67% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1.6, 1.6, 6, 1); }
    97.78% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.481, 0.481, 6, 1); }
    98.89% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.063, 0.063, 6, 1); }
    100.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 6, 1); }
  }
</style>
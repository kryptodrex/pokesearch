<template>
  <div class="pokepage">
    
  </div>
</template>

<script>
  import axios, { AxiosResponse } from 'axios';
  import router from '../router';

  export default {

    name: 'PokePage',
    
    data () {
      return {
        info: null
      }
    },

    mounted () {
      let pokemon = router.currentRoute.params.name;
      console.log(pokemon);

      let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;

      axios.get(url).then(response => ( this.info = response.data.pokemon ));

      // this.pokemonName = this.pokemonData.data.name;
    }

  }
</script>

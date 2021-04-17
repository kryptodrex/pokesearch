<template>
  <div>
    <Loader v-if="isLoading" class="loaderBall" type="ball" size="medium" />
    <div v-if="!isLoading" class="evolutionChain">
        {{ evoDetails }}
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from '@/repositories/repositoryFactory';
import Loader from '@/components/Loader'

const pokeApi = RepositoryFactory.get("pokeApi");

export default {
  name: "EvolutionChain",
  components: {
      Loader
  },
  props: {
    chain: String
  },
  data() {
    return {
        isLoading: false,
        evoDetails: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
        this.isLoading = true;

        var { data } = await pokeApi.getEvolutionChain(this.chain);
        this.evoDetails = data.chain.evolves_to;

        var { data } = await pokeApi.getPokemonSpecies('typhlosion');

        this.isLoading = false;
    },

    

  },
};
</script>

<style scoped lang="css">



.loaderBall {
  margin: 1rem;
}



/* Viewing on smaller phones, like iPhone SE */
@media screen and (max-width: 22.25rem) {
    
}

/* Viewing on large devices, like tablets and desktop */
@media screen and (min-width: 25.9375rem) {
    
}



</style>

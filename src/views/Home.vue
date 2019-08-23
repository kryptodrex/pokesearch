<template>
  <div class="home">
    <!-- {{ info }} -->
    <div class="pokeBoxes">
     
        <div class="pokeBox" v-bind:key="poke.id" v-for="poke in pokeInfo">
           <router-link :to="'/pokemon/' + poke.name">
            {{ poke.name }}
          </router-link>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
  import { RepositoryFactory } from './../repositories/repositoryFactory';
  const PokeRepository = RepositoryFactory.get('pokes');

  export default {
    name: 'Home',
    // components: {
    //   HelloWorld
    // },
    data() {
      return {
        isLoading: false,
        pokeInfo: [],
      };
    },
    created () {
      this.fetch()
    },
    methods: {
      async fetch () {
        this.isLoading = true
        const { data } = await PokeRepository.getAllPokemonSpecies()
        console.log(data)
        this.isLoading = false
        this.pokeInfo = data.results;
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
  .pokeBox {
    border: 2px solid #4A4A4A;
    border-radius: 0.625rem;
    padding: 0 1rem;
    margin: 1rem 0;
    text-align: left;
  }

  a {
    text-decoration: none;
    color: #4A4A4A;
    cursor: pointer;
  }

</style>


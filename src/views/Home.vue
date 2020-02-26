<template>
  <div class="home">
    <!-- {{ info }} -->
    <div class="pokeBoxes">  
        <PokeBox v-for="poke in pokeInfo" v-bind:key="poke.id" :name="poke.name" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { RepositoryFactory } from './../repositories/repositoryFactory'
import PokeBox from '../components/PokeBox'
const PokeRepository = RepositoryFactory.get('pokes')
export default {
  name: 'Home',
  components: {
    PokeBox
  },
  data () {
    return {
      isLoading: false,
      pokeInfo: []
    }
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
      this.pokeInfo = data.results
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

  a {
    text-decoration: none;
    color: #4A4A4A;
    cursor: pointer;
  }

</style>


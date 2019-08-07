<template>
  <div class="home">
    <!-- {{ info }} -->
    <div class="pokeBoxes">
      <div class="pokeBox" v-bind:key="poke.id" v-for="poke in info">
        {{ poke.name }}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios.get('https://pokeapi.co/api/v2/pokemon-species?&limit=9999')
    .then(response => {
      this.info = response.data.results;
    });
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

</style>


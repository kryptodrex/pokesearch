<template> 
    <div class="pokeBox">
        <router-link :to="'/pokemon/' + this.name">
        {{ toUpper(this.name) }}
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'PokeBox',
//   components: {
//     PokeBox
//   },
  props: {
      name: String
  },
  data () {
    return {
      
    }
  },
//   created () {
//     this.fetch()
//   },
  methods: {
    toUpper(name) {
        var pokename = name[0].toUpperCase() + name.slice(1);
        return pokename;
    }
  },
//   computed: {
//     computedPosts () {
//       return this.posts.slice(0, 10)
//     }
//   }
}
</script>


<style>

.pokeBox {
    border: 2px solid #4A4A4A;
    border-radius: 0.625rem;
    padding: 0 1rem;
    margin: 1rem 0;
    text-align: left;
  }

</style>
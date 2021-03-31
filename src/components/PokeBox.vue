<template> 
    <div class="pokeBox">
        <router-link :to="'/pokemon/' + this.name">
        <div class="pokeInfo" >
          <span>{{ toUpper(this.name) }}</span>
          <span>#{{ this.index }}</span>
        </div>
        
        <img class="pokePic" :src="getImageUrl()" :alt="toUpper(this.name)">
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
      name: String,
      url: String
  },
  data () {
    return {
      index: ''
    }
  },
  created () {
    this.findIndex();
  },
  methods: {
    toUpper(name) {
        var pokename = name[0].toUpperCase() + name.slice(1);
        return pokename;
    },

    findIndex() {
      var splitUrl = this.url.split("/");
      var num = splitUrl[6];
      if (num < 10) {
        this.index = '00' + num;
      } else if (num < 100) {
        this.index = '0' + num;
      } else {
        this.index = num;
      }
    },

    getImageUrl() {
      var basePath = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"
      return basePath + this.index + ".png";
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
    text-align: center;
    cursor: pointer;

    padding: 0.5rem;
    margin: 0.4rem;

    transition: 0.2s;
}

.pokeBox:hover {
  box-shadow: 0px 3px 2px #757575;
  transition: 0.2s;
}

.pokeInfo {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

.pokePic {
  /* margin-top: 1rem; */
  height: 8rem;
}

/* Styling for desktop/tablet viewing */
@media screen and (min-width: 25.9375rem) {
  .pokeBox {
    padding: 1rem;
    margin: 1rem;
}

  .pokePic {
    height: 10rem;
  }
}

</style>
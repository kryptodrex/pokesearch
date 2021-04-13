<template> 
    <div class="pokeBox">
        <router-link :to="'/pokemon/' + this.dexNum">
        <div class="pokeInfo" >
          <span>{{ toUpper(this.name) }}</span>
          <span>#{{ findIndex() }}</span>
        </div>
        
        <img class="pokePic" :src="getImageUrl()" :alt="toUpper(this.name)">
        </router-link>
    </div>
</template>

<script>

export default {
  name: 'PokeBox',
  props: {
      name: String,
      dexNum: String
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
      if (this.dexNum < 10) {
        return '00' + this.dexNum;
      } else if (this.dexNum < 100) {
        return '0' + this.dexNum;
      } else {
        return this.dexNum;
      }
    },

    getImageUrl() {
      var basePath = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"
      return basePath + this.findIndex() + ".png";
    }
  }
}

</script>


<style scoped lang="css">

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

/* Viewing on smaller phones, like iPhone SE */
@media screen and (max-width: 22.25rem) {
  .pokePic {
    height: 6.5rem;
  }
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
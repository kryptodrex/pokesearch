<template> 
    <div class="pokeBox" :id="dexNum">
        <router-link :to="'/pokemon/' + this.dexNum">

        <div class="pokeInfo" >
          <span>{{ toUpper(this.name) }}</span>
          <span>#{{ findIndex() }}</span>
        </div>
          
        <img class="pokePic" :class="imgLoadClass" :src="getImageUrl()" :alt="toUpper(this.name)" @load="setLoaded">
        <Loader class="pokePic loaderBall" :class="loaderClass" type="ball" size="medium" />
        
        </router-link>
    </div>
</template>

<script>
import Loader from '@/components/Loader'

export default {
  name: 'PokeBox',
  components: {
    Loader
  },
  props: {
      name: String,
      dexNum: String
  },
  data () {
    return {
      index: '',
      imgLoadClass: 'loading',
      loaderClass: ''
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
    },

    setLoaded() {
      this.imgLoadClass = ''
      this.loaderClass = 'loaded'
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

.pokeBox:hover, .pokeBox:focus {
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
.loading, .loaded {
  display: none;
}
.loaderBall {
  width: 8rem;
  margin: 0rem;
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

  .loaderBall {
    width: 10rem;
  }
}

</style>
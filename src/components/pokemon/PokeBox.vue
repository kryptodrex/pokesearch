<template>
    <!-- <div class="pokeBox" :id="dexNum" :class="'border-' + color.main"> -->
    <div class="pokeBox border-" :id="dexNum">
      <router-link :to="'/pokemon/' + dexNum">

        <div class="pokeInfo" >
          <span>{{ toUpper(name) }}</span>
          <span>#{{ formatIndex() }}</span>
        </div>

        <img class="pokePic" :class="imgLoadClass" :src="getImageUrl()" :alt="toUpper(name)" @load="setLoaded">
        <!-- <img class="pokePic" :class="imgLoadClass" :src="getImageUrl()" :alt="toUpper(name)" @load="setLoaded" @mouseover="getPokeData()" @mouseleave="swapData()"> -->

        <!-- <transition name="fade">
          <div class="pokemon-types" v-if="types">
            <div
              v-for="typeInfo in types.main"
              :class="'type-' + typeInfo.type.name"
              :key="typeInfo.slot"
            >
              {{ toUpper(typeInfo.type.name) }}
            </div>
          </div>
        </transition> -->

        <Loader class="pokePic loaderBall" :class="loaderClass" type="ball" size="medium" />
        <!-- <Loader class="pokePic loaderBall" type="ball" size="medium" v-if="getData !== null && isLoading" /> -->

      </router-link>
    </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import { RepositoryFactory } from '@/repositories/repositoryFactory'

const pokeApi = RepositoryFactory.get('pokeApi')
const util = RepositoryFactory.get('util')

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
      imgUrl: '',
      imgLoadClass: 'loading',
      loaderClass: '',
      types: null,
      color: { main: '' },
      gotData: false
    }
  },
  created () {
    this.formatIndex()
  },
  methods: {

    async getPokeData () {
      if (!this.gotData) {
        var { data } = await pokeApi.getPokemonSpecies(this.dexNum) // eslint-disable-line
        this.color = {
          main: data.color.name, // eslint-disable-line
          backup: ''
        }

        var { data } = await pokeApi.getPokemon(this.dexNum) // eslint-disable-line
        this.types = {
          main: data.types, // eslint-disable-line
          backup: []
        }

        this.gotData = true
      } else {
        this.swapData()
      }
    },

    swapData () {
      if (this.color.main === '') {
        this.color.main = this.color.backup
        this.color.backup = ''
      } else {
        this.color.backup = this.color.main
        this.color.main = ''
      }

      if (this.types.main.length === 0) {
        this.types.main = this.types.backup
        this.types.backup = []
      } else {
        this.types.backup = this.types.main
        this.types.main = []
      }
    },

    getAbbrType (name) {
      return name.substring(0, 3).toUpperCase()
    },

    toUpper (name) {
      return util.toUpper(name)
    },

    formatIndex () {
      if (this.dexNum < 10) {
        return '00' + this.dexNum
      } else if (this.dexNum < 100) {
        return '0' + this.dexNum
      } else {
        return this.dexNum
      }
    },

    getImageUrl () {
      var basePath = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'
      return basePath + this.formatIndex() + '.png'
    },

    setLoaded () {
      this.imgLoadClass = ''
      this.loaderClass = 'loaded'
    },

    getEntryForLocale (data) {
      var entry

      if (!entry) {
        data.forEach(item => {
          if (item.language.name === 'en') {
            entry = item
          }
        })
      }

      return entry
    }
  }
}

</script>

<style scoped lang="css">

@import '../../styling/colors.css';
@import '../../styling/types.css';

.pokeBox {
    /* border: 2px solid #4A4A4A; */
    border-radius: 0.625rem;
    text-align: center;
    cursor: pointer;

    padding: 0.5rem;
    margin: 0.4rem;

    transition: 0.2s;
}

.pokeBox:hover, .pokeBox:focus {
  box-shadow: 0 5px 5px 0 rgba(0,0,0,0.20);;
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

/* Type styling */
.pokemon-types {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

[class*="type-"] {
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 2.7rem;
  border-radius: 0.625rem;
  margin: 0 0.2rem;
  padding: 0.2rem 0.5rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.loading, .loaded {
  display: none;
}
.loaderBall {
  width: 8rem;
  margin: 0rem;
}

/* Pokemon colors */
.black {
  color: #323232;
}
.blue {
  color: #3482de;
}
.brown {
  color: #af891f;
}
.gray {
  color: #707070;
}
.green {
  color: #64a743;
}
.pink {
  color: #e97698;
}
.purple {
  color: #7c63b8;
}
.red {
  color: #ef4036;
}
.white {
  color: #aaaaaa;
}
.yellow {
  color: #f8d030;
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

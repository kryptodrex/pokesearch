<template>
    <div class="pokeBox" :id="dexNum">
    <!-- <div class="pokeBox" :class="speciesData.color" :id="dexNum"> -->
        <router-link :to="'/pokemon/' + dexNum">

          <div class="pokeInfo" >
            <span>{{ toUpper(name) }}</span>
            <!-- <span>{{ speciesData.name }}</span> -->
            <span>#{{ findIndex() }}</span>
          </div>

          <img class="pokePic" :class="imgLoadClass" :src="getImageUrl()" :alt="toUpper(name)" @load="setLoaded">

          <Loader class="pokePic loaderBall" :class="loaderClass" type="ball" size="medium" />
          <!-- <Loader class="pokePic loaderBall" type="ball" size="medium" v-if="getData != null && isLoading" /> -->

        </router-link>
    </div>
</template>

<script>
import Loader from '@/components/Loader'
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
    dexNum: String,
    // getData: Object
  },
  data () {
    return {
      index: '',
      imgUrl: '',
      imgLoadClass: 'loading',
      loaderClass: '',
      isLoading: false
    }
  },
  created () {
    this.fetch()
  },
  methods: {

    async fetch () {
      

      this.findIndex()

      // if (getData != null) {

      //   this.isLoading = true;



      //   this.isLoading = false;
      // }

      // var { data } = await pokeApi.getPokemonSpecies(this.dexNum);
      // this.speciesData = {
      //   name: this.getEntryForLocale(data.names).name,
      //   color: data.color
      // }

      
    },

    toUpper (name) {
      return util.toUpper(name)
    },

    findIndex () {
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
      return basePath + this.findIndex() + '.png'
    },

    setLoaded () {
      this.imgLoadClass = ''
      this.loaderClass = 'loaded'
    },

    getEntryForLocale (data) {
      var entry

      if (entry == null) {
        data.forEach(item => {
          if (item.language.name == 'en') {
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

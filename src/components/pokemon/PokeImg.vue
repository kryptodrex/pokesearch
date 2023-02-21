<template>
    <!-- <div class="pokeBox" :id="dexNum" :class="'border-' + color.main"> -->
    <div class="pokeBox">
      <img class="pokePic" :class="imgLoadClass" :src="getImageUrl()" :alt="toUpper(name)" @load="setLoaded">
      <Loader class="pokePic loaderBall" :class="loaderClass" type="ball" size="medium" />
    </div>
</template>

<script>
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repositories/repositoryFactory'

const util = RepositoryFactory.get('util')

export default {
  name: 'PokeImg',
  components: {
    Loader
  },
  props: {
    baseUrl: String,
    name: String,
    dexNum: Number
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
      return this.baseUrl + this.formatIndex() + '.png'
    },

    setLoaded () {
      this.imgLoadClass = ''
      this.loaderClass = 'loaded'
    }
  }
}

</script>

<style scoped lang="css">

@import '../../styling/colors.css';
@import '../../styling/types.css';

.pokeBox {
    /* border: 2px solid #4A4A4A; */
    /* border-radius: 0.625rem; */
    text-align: center;
    cursor: pointer;

    /* padding: 0.5rem;
    margin: 0.4rem;

    transition: 0.2s; */
}

/* .pokeBox:hover, .pokeBox:focus {
  box-shadow: 0 5px 5px 0 rgba(0,0,0,0.20);;
  transition: 0.2s;
} */

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

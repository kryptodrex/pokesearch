<template>
    <div class="search">
      <div class="searchbar">

        <input class="search-input" type="text" :placeholder="placeholder" v-model="searchValue" v-on:input="waitForTypingToStop" v-if="!hasAutosuggest" >
        <!-- <vue-autosuggest class="search-input" v-if="hasAutosuggest"
            :suggestions="filteredSpeciesList"
            :input-props="{placeholder: placeholder}"
            @input="waitForTypingToStop"
            @selected="selectHandler"
            @click="clickHandler"
        >   -->
          <!-- <template slot-scope="{suggestion}">
            <span class="my-suggestion-item">{{suggestion.item}}</span>
          </template> -->
        <!-- </vue-autosuggest> -->

        <div class="clearBtn" v-on:click="clearSearch()" v-if="searchValue.length >= 3 && hasClear">
          <CustomButton size="medium" color="red"> Clear </CustomButton>
        </div>
      </div>
      <div class="loadingSearch" v-if="isLoading">
        <Loader />
      </div>
    </div>
</template>

<script>
// import { VueAutosuggest } from 'vue-autosuggest'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import Loader from '@/components/Loader'
import CustomButton from '@/components/CustomButton'

const pokeApi = RepositoryFactory.get('pokeApi')

export default {
  name: 'PokeBox',
  components: {
    Loader,
    CustomButton
    // VueAutosuggest
  },
  props: {
    placeholder: String,
    hasClear: Boolean,
    hasAutosuggest: Boolean
  },
  data () {
    return {
      isLoading: false,
      searchValue: '',
      speciesList: [],
      timeout: null
    }
  },
  methods: {
    async searchPokemon () {
      this.isLoading = true

      this.speciesList = []
      var { data } = await pokeApi.getAllPokemonSpecies()
      data.results.forEach(species => {
        this.speciesList.push({
          name: species.name,
          url: species.url,
          index: this.getIndex(species.url)
        })
      })

      this.isLoading = false

      var that = this
      this.$emit('searching', that.filteredSpeciesList)
    },

    waitForTypingToStop () {
      if (this.searchValue.length >= 3) {
        clearTimeout(this.timeout)

        var that = this
        this.timeout = setTimeout(function () {
          that.searchPokemon()
        }, 800)
      }
    },

    clearSearch () {
      this.searchValue = ''
      // var that = this
      this.$emit('searching', ['clear'])
    },

    getIndex (url) {
      var splitUrl = url.split('/')
      return splitUrl[6]
    }
  },
  computed: {
    filteredSpeciesList () {
      let tempList = this.speciesList

      // Process search input
      if (this.searchValue !== '' && this.searchValue) {
        tempList = tempList.filter((item) => {
          return item.name
            .toUpperCase()
            .includes(this.searchValue.toUpperCase())
        })
      }

      tempList.sort(function (a, b) {
        return a.index - b.index
      })

      return tempList
    }
  }
}

</script>

<style scoped lang="css">

.searchbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
  /* margin-bottom: 0.5rem; */
}

.search-input {
  border: 2px solid #707070;
  border-radius: 0.625rem;
  padding: 0.5rem 1rem;
  line-height: 1.8rem;
  font-size: 1.2rem;
  width: 100%;
  transition: 0.3s;
}

.search-input:focus {
    border: 2px solid rgb(201, 38, 63);
    background-color: white;
    transition: 0.3s;
}

.clearBtn {
  margin-left: 0.5rem;
}

.loadingSearch {
  margin: 1rem;
}

/* Styling for desktop/tablet viewing */
@media screen and (min-width: 25.9375rem) {
  .search-input:hover {
    border: 2px solid rgb(201, 38, 63);
    transition: 0.3s;
  }
}

</style>

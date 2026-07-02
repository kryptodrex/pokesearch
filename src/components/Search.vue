<template>
    <div class="search">
      <div class="searchbar">

        <input class="search-input" type="text" :placeholder="placeholder" v-model="searchValue" v-on:input="waitForTypingToStop" v-if="!autosuggest" >
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

        <div class="clearBtn" v-on:click="clearSearch()" v-if="searchValue.length >= 1 && clearable">
          <Button size="medium" color="red"> Clear </Button>
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
import Button from '@/components/Button'

const pokeApi = RepositoryFactory.get('pokeApi')

export default {
  name: 'PokeBox',
  components: {
    Loader,
    Button
    // VueAutosuggest
  },
  props: {
    placeholder: String,
    clearable: Boolean,
    autosuggest: Boolean
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
            .includes(this.searchValue.trim().toUpperCase())
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

<style scoped lang="scss">

.searchbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
}

.search-input {
  border: 2px solid $color-text-muted;
  border-radius: $radius-md;
  padding: $space-sm $space-md;
  line-height: 1.8rem;
  font-size: 1.2rem;
  width: 100%;
  transition: $transition-base;
}

.search-input:focus {
  border: 2px solid $color-primary;
  background-color: white;
  transition: $transition-base;
}

.clearBtn {
  margin-left: $space-sm;
}

.loadingSearch {
  margin: $space-md;
}

@media screen and (min-width: $bp-md) {
  .search-input:hover {
    border: 2px solid $color-primary;
    transition: $transition-base;
  }
}

</style>

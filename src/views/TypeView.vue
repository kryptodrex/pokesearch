<template>
  <div class="typePage">
    <Loader v-if="isLoading" :full-page="true" />

    <div class="typeData" v-if="!isLoading">
      <div class="typeHeader">
        <TypeBox :typeName="typeInfo.name" size="large" :linkEnabled="false">
          <b>{{ toUpper(typeInfo.name) }} Type</b>
        </TypeBox>
      </div>

      <div class="basicInfo info-box" :class="'type-border-' + typeInfo.name">
        <h3>Type Data</h3>
        <p><strong>Introduced in </strong> {{ getGeneration(typeInfo.generation.name) }}</p>
        <p><strong>Damage class:</strong> {{ !checkNull(typeInfo.move_damage_class) ? toUpper(typeInfo.move_damage_class.name) : 'Variable' }}</p>
      </div>

      <div class="typeCharts">
        <div class="typeDefense info-box" :class="'type-border-' + typeInfo.name">
          <h3>Defensiveness</h3>
          <p>Effectiveness of other types against the <TypeName :name="typeInfo.name">{{ toUpper(typeInfo.name) }}</TypeName> type</p>
          <TypeEffectiveness :key="typeEffKey" :typing="types" direction="from" />

          <div class="typeDualDefense">
            <span>Add another typing to see dual typing defensiveness:</span>
            <div class="typeSelect">
              <select
                name="typeList"
                id="typeList"
                :class="typeSelectClass"
                :value="types[1]"
                @change="e => updateTypes(e.target.value)"
              >
                <option value=""> - Select a type - </option>
                <option v-for="(type, index) in allTypeNames" :key="index" :value="type.toLowerCase()">{{ type }}</option>
              </select>

              <div class="clear" v-if="types.length > 1" v-on:click="updateTypes('')">
                <Button size="medium" color="ps-red">Clear</Button>
              </div>
            </div>
          </div>
        </div>

        <div class="typeOffense info-box" :class="'type-border-' + typeInfo.name">
          <h3>Offensiveness</h3>
          <p>Effectiveness of the <TypeName :name="typeInfo.name">{{ toUpper(typeInfo.name) }}</TypeName> type against all other types</p>
          <TypeEffectiveness :typing="types" direction="to" />
        </div>

        <div class="info-box" :class="'type-border-' + typeInfo.name">
          <h3><TypeName :name="typeInfo.name">{{ toUpper(typeInfo.name) }}</TypeName> Type Pokémon</h3>
          <div class="pokemonList">
            <PokeBox
              v-for="(poke) in pokesWithType"
              :key="poke.name"
              :dexNum="getIndex(poke.url)"
              :name="poke.name"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import Loader from '@/components/Loader'
import TypeEffectiveness from '@/components/pokemon/TypeEffectiveness'
import Button from '@/components/Button'
import TypeBox from '@/components/types/TypeBox'
import PokeBox from '../components/pokemon/PokeBox.vue'
import TypeName from '../components/types/TypeName.vue'

const pokeApi = RepositoryFactory.get('pokeApi')
const util = RepositoryFactory.get('util')

export default {

  name: 'TypeView',
  components: {
    Loader,
    Button,
    TypeEffectiveness,
    TypeBox,
    TypeName,
    PokeBox
  },
  data () {
    return {
      type: router.currentRoute.params.name,
      isLoading: true,
      typeInfo: null,
      types: [],
      allTypeNames: [],
      pokesWithType: [],
      typeEffKey: 1,
      dropdownVisible: false,
      navigating: false,
      locales: [],
      title: ' - Type'
    }
  },
  mounted () {
    this.fetch()
    this.locales = util.getUserLocales()
  },
  updated () {
    if (this.navigating) {
      // this.formInfo = null
      this.fetch()
      this.navigating = false
    }
  },
  methods: {
    async fetch () {
      this.isLoading = true

      // Get data on the type from url
      var { data } = await pokeApi.getType(this.type)
      this.typeInfo = data

      // Get array of Pokemon that have this type
      this.pokesWithType = []
      this.typeInfo.pokemon.forEach(poke => {
        const name = poke.pokemon.name
        const url = poke.pokemon.url
        const id = this.getIndex(url)
        if (id < 10000) {
          this.pokesWithType.push({
            name: name,
            url: url
          })
        }
      })

      // Add main type to the types array for tracking
      this.types.push(this.typeInfo.name)

      var { data } = await pokeApi.getAllTypes() // eslint-disable-line
      data.results.filter((item) => { // filtering out unknown and shadow types
        if (item.name !== 'unknown' && item.name !== 'shadow' && item.name !== this.typeInfo.name) return item
      }).forEach(type => {
        this.allTypeNames.push(this.toUpper(type.name))
      })

      document.title = this.toUpper(this.typeInfo.name) + this.title // set site title to type name

      this.isLoading = false
    },

    // == Utilities ==============

    toUpper (value) {
      return util.toUpper(value)
    },

    toUpperEachWord (value) {
      var strArr = value.trim().split(' ')
      var newString = ''
      strArr.forEach(str => {
        newString += this.toUpper(str) + ' '
      })
      return newString.trim()
    },

    formatText (text) {
      return text.trim().replace('/\s+/', '') // eslint-disable-line no-useless-escape
    },

    formatIndex (value) {
      return util.formatIndex(value)
    },

    getIndex (url) {
      return util.getId(url)
    },

    checkNull (data) {
      if (!data) return true
      else return false
    },

    updateTypes (type) {
      // console.log(this.types)
      if (this.types.length > 1) {
        this.types.pop()
      }
      if (type !== '') {
        this.types.push(type)
      }
      this.typeEffKey += 1
      console.log(this.types)
    },

    getGeneration (gen) {
      var split = gen.split('-')
      return util.toUpper(split[0]) + ' ' + split[1].toUpperCase()
    },

    toggle () {
      this.dropdownVisible = !this.dropdownVisible
    }

    // getEntryForLocale (data) {
    //   var entry

    //   if (!entry) {
    //     data.forEach(item => {
    //       if (item.language.name === 'en') {
    //         entry = item
    //       }
    //     })
    //   }

    //   return entry
    // }
  },
  computed: {
    typeSelectClass () {
      return this.types.length > 1
        ? 'type-border-' + this.types[1] + ' type-color-' + this.types[1]
        : 'type-border-' + this.types[0] + ' type-color-' + this.types[0]
    }
  },
  watch: {
    $route: function (to, from) {
      this.type = ''
      this.types = []
      this.type = to.params.name
      this.navigating = true
      // location.reload()
    }
  }
}
</script>

<style scoped lang="scss">

@import '../styling/types.scss';
@import '../styling/colors.css';

.typePage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 0;
}

.typeData {
  max-width: 46.875rem;
}

.typeHeader {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 2rem 1rem;
}

.typeCharts {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.typeDefense, .typeOffense, .pokemonList {
  width: 100%
}

.typeSelector {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.pokemonList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.typeDualDefense{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 1.5rem 0 1rem 0;
}
.typeSelect {
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  select {
    -webkit-appearance: none;
    padding: 0.2rem 1rem;
    min-width: 5.625rem;
    height: 2.75rem;
    text-align: center;
    border-radius: 0.625rem;
    font-size: inherit;
    background-color: white;
    font: inherit;
    margin-right: 1rem;
  }
}

@media screen and (min-width: 25.9375rem) {
  .typeSelect {
    margin-top: 0;
    select {
      margin: 0 1rem;
    }
  }
}
</style>

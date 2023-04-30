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
          <p>
            Effectiveness of other types against
            <span v-if="types.length === 1"> the <TypeName :name="typeInfo.name">{{ toUpper(typeInfo.name) }}</TypeName> type</span>
            <span v-if="types.length > 1">
              a <TypeName :name="types[0]">{{ toUpper(types[0]) }}</TypeName> & <TypeName :name="types[1]">{{ toUpper(types[1]) }}</TypeName> type
            </span>
          </p>
          <TypeEffectiveness :key="typeEffKey" :typing="types" direction="from" />

          <div class="typeDualDefense">
            <p>Add another typing to see dual typing defensiveness:</p>
            <TypeSelect :mainType="types[0]" :count="1" @change="updateDefenseTypes($event)" />
          </div>
        </div>

        <div class="typeOffense info-box" :class="'type-border-' + typeInfo.name">
          <h3>Offensiveness</h3>
          <p>Effectiveness of the <TypeName :name="typeInfo.name">{{ toUpper(typeInfo.name) }}</TypeName> type against all other types</p>
          <TypeEffectiveness :typing="types" direction="to" />

          <div class="typeDualOffense">
            <p>Use the dropdowns to select a dual-type and see the effectiveness of the <TypeName :name="typeInfo.name">{{ toUpper(typeInfo.name) }}</TypeName> type against it:</p>
            <div class="typeDualOffenseResults">
              <TypeSelect :mainType="types[0]" :count="2" @change="updateOffenseTypes($event)" />
              <div
                class="typeDualOffenseEff"
                v-if="offenseTypes[1] !== '' && offenseTypes[2] !== ''"
              >
                <TypeEffectiveness :key="typeEffKey+1" :typing="offenseTypesArray" direction="from" :defenseTypes="[ { name: type } ]" :noAbbreviation="true" />
                <!-- <p><TypeName :name="typeInfo.name">{{ toUpper(typeInfo.name) }}</TypeName> is</p>
                <p>{{ typeDualOffenseResult }}</p>x
                <p>effective</p> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- List of Pokemon of this type -->
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
</template>

<script>
import router from '@/router'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import Loader from '@/components/Loader'
import TypeEffectiveness from '@/components/types/TypeEffectiveness'
// import Button from '@/components/Button'
import TypeBox from '@/components/types/TypeBox'
import PokeBox from '../components/pokemon/PokeBox.vue'
import TypeName from '../components/types/TypeName.vue'
import TypeSelect from '../components/types/TypeSelect.vue'

const pokeApi = RepositoryFactory.get('pokeApi')
const util = RepositoryFactory.get('util')

export default {

  name: 'TypeView',
  components: {
    Loader,
    // Button,
    TypeEffectiveness,
    TypeBox,
    TypeName,
    PokeBox,
    TypeSelect
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
      offenseTypes: { 1: '', 2: '' },
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
      this.reset()
      this.fetch()
      this.navigating = false
    }
  },
  methods: {
    reset () {
      this.typeInfo = null
      this.types = []
      this.allTypeNames = []
      this.pokesWithType = []
      this.typeEffKey = 1
      this.offenseTypes = { 1: '', 2: '' }
      this.locales = []
      this.title = ' - Type'
    },
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

    updateDefenseTypes (type) {
      // console.log(this.types)
      var typeName = type.name
      if (this.types.length > 1) {
        this.types.pop()
      }
      if (typeName !== '') {
        this.types.push(typeName)
      }
      this.typeEffKey += 1
      // console.log(this.types)
    },

    updateOffenseTypes (type) {
      // console.log(this.types)
      if (type.name !== '') {
        this.offenseTypes[type.num] = type.name
      } else {
        this.offenseTypes = { 1: '', 2: '' }
      }
      this.typeEffKey += 1
      console.log(this.offenseTypes)
    },

    getGeneration (gen) {
      var split = gen.split('-')
      return util.toUpper(split[0]) + ' ' + split[1].toUpperCase()
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
    offenseTypesArray () {
      var array = []
      array.push(this.offenseTypes[1])
      array.push(this.offenseTypes[2])
      return array
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

.typeDualDefense, .typeDualOffense {
  margin: 1.5rem 0 1rem 0;
}

.typeDualDefense{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  // margin: 1.5rem 0 1rem 0;

  p {
    margin: 0;
    margin-right: 1rem;
  }
}

.typeDualOffense{
  width: 100%;

  .typeDualOffenseResults {
    // display: grid;
    // grid-template-rows: 1fr;
    // grid-template-columns: 1fr;
    text-align: center;
    width: 100%;
  }

  .typeDualOffenseEff {
    width: 50%;
    text-align: center;
  }
}

@media screen and (min-width: 27rem) {
  .typeDualOffense {
  width: 100%;

    .typeDualOffenseResults {
      // grid-template-columns: 1fr 1fr;
    }

    .typeDualOffenseEff {
      width: 50%;
    }
}
}
</style>

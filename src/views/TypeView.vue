<template>
  <div class="typePage">
    <Loader v-if="isLoading" :full-page="true" />

    <div class="typeData" v-if="!isLoading">
      <div class="typeHeader">
        <TypeBox :typeName="typeInfo.name" size="large">
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
          <p>Defensiveness:</p>
          <TypeEffectiveness :key="typeEffKey" :typing="types" direction="from" />
          <p>Add another typing to see dual typing defensiveness:</p>

          <select name="typeList" id="typeList" v-on:change="e => updateTypes(e.target.value)">
            <option v-for="(type, index) in allTypes" :key="index" :value="type.name">{{ toUpper(type.name) }}</option>
          </select>

          <Dropdown value="Select a type" :list="allTypes" />

          <div class="clear" v-if="types.length > 1" v-on:click="updateTypes('', clear = true)">
            <Button size="medium" color="ps-red">Clear</Button>
          </div>
        </div>

        <div class="typeOffense info-box" :class="'type-border-' + typeInfo.name">
          <p>Offensiveness:</p>
          <TypeEffectiveness :typing="types" direction="to" />
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
import Dropdown from '../components/Dropdown.vue'

const pokeApi = RepositoryFactory.get('pokeApi')
const util = RepositoryFactory.get('util')

export default {

  name: 'TypeView',
  components: {
    Loader,
    Button,
    TypeEffectiveness,
    TypeBox,
    Dropdown
  },
  data () {
    return {
      type: router.currentRoute.params.name,
      isLoading: true,
      typeInfo: null,
      types: [],
      allTypes: [],
      typeEffKey: 1,
      nextNum: null,
      prevNum: null,
      navigating: false,
      timeout: null,
      timer: 0,
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

      var { data } = await pokeApi.getType(this.type)
      this.typeInfo = data

      this.types.push({
        type: {
          name: this.typeInfo.name
        }
      })

      var { data } = await pokeApi.getAllTypes() // eslint-disable-line
      this.allTypes = data.results.filter((item) => { // filtering out unknown and shadow types
        if (item.name !== 'unknown' && item.name !== 'shadow' && item.name !== this.typeInfo.name) return item
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

    checkNull (data) {
      if (!data) return true
      else return false
    },

    updateTypes (type, clear = false) {
      if (this.types.length > 1) {
        this.types.pop()
      }
      if (!clear) {
        this.types.push({
          type: {
            name: type
          }
        })
      }
      this.typeEffKey += 1
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

@import '../styling/types.css';
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

.typeDefense, .typeOffense {
  width: 100%
}

// @media screen and (min-width: 25.9375rem) {

// }
</style>

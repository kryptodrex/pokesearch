<template>
  <div class="typePage" :key="type">
    <Loader v-if="isLoading" :full-page="true" />

    <div class="typeData" v-if="!isLoading">
      <TypeBox :typeName="typeInfo.name" size="large">{{ toUpper(typeInfo.name) }} Type</TypeBox>

      <span>Comparing {{ toUpper(typeInfo.name) }}. Add another typing to see dual typing defensiveness:</span>
      <select name="typeList" id="typeList" v-on:change="e => updateTypes(e.target.value)">
        <option v-for="(type, index) in allTypes" :key="index" :value="type.name">{{ toUpper(type.name) }}</option>
      </select>
      <div class="clear" v-if="types.length > 1" v-on:click="updateTypes('', clear = true)">
        <Button size="medium" color="ps-red">Clear</Button>
      </div>

      Defensiveness:
      <TypeEffectiveness :key="typeEffKey" :typing="types" direction="from" />

      Offensiveness:
      <TypeEffectiveness :key="typeEffKey" :typing="types" direction="to" />
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

const pokeApi = RepositoryFactory.get('pokeApi')
const util = RepositoryFactory.get('util')

export default {

  name: 'Type',
  components: {
    Loader,
    Button,
    TypeEffectiveness,
    TypeBox
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
      var val = value.trim()
      if (val !== '') return util.toUpper(val)
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

// @media screen and (min-width: 25.9375rem) {

// }
</style>

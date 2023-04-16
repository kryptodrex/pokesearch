<template>
  <div class="typePage" :class="'type-color-' + typeInfo.name">
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
          <p>Defensiveness:</p>
          <TypeEffectiveness :key="typeEffKey" :typing="types" direction="from" />
          <p>Add another typing to see dual typing defensiveness:</p>

          <!-- <select name="typeList" id="typeList" v-on:change="e => updateTypes(e.target.value)">
            <option v-for="(type, index) in allTypes" :key="index" :value="type.name">{{ toUpper(type.name) }}</option>
          </select> -->

          <!-- <Dropdown value="Select a type" :list="allTypes" /> -->

          <div class="typeSelector">
            <div
              v-for="(type, index) in allTypes"
              :key="index"
              v-on:click="e => updateTypes(e.target.innerHTML.toLowerCase().trim())"
            >
              <TypeBox
                :typeName="type.name"
                :linkEnabled="false"
                :clickable="true"
              >
                {{ toUpper(type.name) }}
            </TypeBox>
            </div>
          </div>

          <!-- <table>
            <tr>
              <td
                v-for="num in 5"
                :key="num"
              >
                <TypeBox
                  :typeName="allTypes[num].name"
                  :linkEnabled="false"
                  :clickable="true"
                >
                  {{ toUpper(allTypes[num].name) }}
                </TypeBox>
              </td>
            </tr>
            <tr>
              <td
                v-for="num in 5"
                :key="(num + 4) * 2"
              >
                <TypeBox
                  :typeName="allTypes[(num + 4) * 2].name"
                  :linkEnabled="false"
                  :clickable="true"
                >
                  {{ toUpper(allTypes[(num + 4) * 2].name) }}
                </TypeBox>
              </td>
            </tr>
            <tr>
              <td
                v-for="num in 5"
                :key="(num + 3) * 3"
              >
                <TypeBox
                  :typeName="allTypes[(num + 4) * 3].name"
                  :linkEnabled="false"
                  :clickable="true"
                >
                  {{ toUpper(allTypes[(num + 4) * 3].name) }}
                </TypeBox>
              </td>
            </tr>
          </table> -->

          <div class="clear" v-if="types.length > 1" v-on:click="updateTypes('', clear = true)">
            <Button size="medium" color="ps-red">Clear</Button>
          </div>
        </div>

        <div class="typeOffense info-box" :class="'type-border-' + typeInfo.name">
          <p>Offensiveness:</p>
          <TypeEffectiveness :typing="types" direction="to" />
        </div>

        <div class="info-box" :class="'type-border-' + typeInfo.name">
          <h3>{{ toUpper(typeInfo.name) }} Type Pokémon</h3>
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
// import Dropdown from '../components/Dropdown.vue'

const pokeApi = RepositoryFactory.get('pokeApi')
const util = RepositoryFactory.get('util')

export default {

  name: 'TypeView',
  components: {
    Loader,
    Button,
    TypeEffectiveness,
    TypeBox,
    // Dropdown
    PokeBox
  },
  data () {
    return {
      type: router.currentRoute.params.name,
      isLoading: true,
      typeInfo: null,
      types: [],
      allTypes: [],
      pokesWithType: [],
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

      // this.types.push({
      //   type: {
      //     name: this.typeInfo.name
      //   }
      // })
      this.types.push(this.typeInfo.name)

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

    getIndex (url) {
      return util.getId(url)
    },

    checkNull (data) {
      if (!data) return true
      else return false
    },

    updateTypes (type, clear = false) {
      // console.log(this.types)
      if (this.types.length > 1) {
        this.types.pop()
      }
      // if (!clear) {
      //   this.types.push({
      //     type: {
      //       name: type
      //     }
      //   })
      // }
      if (!clear) {
        this.types.push(type)
      }
      this.typeEffKey += 1
      console.log(this.types)
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

// @media screen and (min-width: 25.9375rem) {

// }
</style>

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
          <p>Effectiveness of other types against the {{ toUpper(typeInfo.name) }} type</p>
          <TypeEffectiveness :key="typeEffKey" :typing="types" direction="from" />
          <!-- <p>Add another typing to see dual typing defensiveness:</p> -->

          <!-- <select name="typeList" id="typeList" v-on:change="e => updateTypes(e.target.value)">
            <option v-for="(type, index) in allTypeNames" :key="index" :value="type.name">{{ toUpper(type.name) }}</option>
          </select> -->

          <!-- <Dropdown
            class="info-box"
            :class="'type-border-' + typeInfo.name"
            value="Select a type"
            :list="allTypeNames"
          /> -->
          <!-- <div class="aselect" >
            <div class="selector" @click="toggle()">
              <div class="label">
                <span>Select a type</span>
              </div>
              <div class="arrow" :class="{ expanded : dropdownVisible }"></div>
              <div :class="{ hidden : !dropdownVisible, dropdownVisible }">
                <ul> -->
                  <!-- <li
                    :class="{ current : item === value }"
                    v-for="item, index in list" @click="select(item)"
                    :key="index"
                  >
                    {{ item }}
                  </li> -->
                  <!-- <div
                    v-for="(type, index) in allTypeNames"
                    :key="index"
                    @click="e => updateTypes(e.target.innerHTML.toLowerCase().trim())"
                  >
                    <TypeBox
                      :typeName="type.name"
                      :linkEnabled="false"
                      :clickable="true"
                    >
                      {{ toUpper(type.name) }}
                    </TypeBox>
                  </div>
                </ul>
              </div>
            </div>
          </div> -->

          <!-- <div class="typeSelector">
            <div
              v-for="(type, index) in allTypeNames"
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
          </div> -->

          <!-- <table>
            <tr>
              <td
                v-for="num in 5"
                :key="num"
              >
                <TypeBox
                  :typeName="allTypeNames[num].name"
                  :linkEnabled="false"
                  :clickable="true"
                >
                  {{ toUpper(allTypeNames[num].name) }}
                </TypeBox>
              </td>
            </tr>
            <tr>
              <td
                v-for="num in 5"
                :key="(num + 4) * 2"
              >
                <TypeBox
                  :typeName="allTypeNames[(num + 4) * 2].name"
                  :linkEnabled="false"
                  :clickable="true"
                >
                  {{ toUpper(allTypeNames[(num + 4) * 2].name) }}
                </TypeBox>
              </td>
            </tr>
            <tr>
              <td
                v-for="num in 5"
                :key="(num + 3) * 3"
              >
                <TypeBox
                  :typeName="allTypeNames[(num + 4) * 3].name"
                  :linkEnabled="false"
                  :clickable="true"
                >
                  {{ toUpper(allTypeNames[(num + 4) * 3].name) }}
                </TypeBox>
              </td>
            </tr>
          </table> -->

          <div class="clear" v-if="types.length > 1" v-on:click="updateTypes('', clear = true)">
            <Button size="medium" color="ps-red">Clear</Button>
          </div>
        </div>

        <div class="typeOffense info-box" :class="'type-border-' + typeInfo.name">
          <h3>Offensiveness</h3>
          <p>Effectiveness of the {{ toUpper(typeInfo.name) }} type against other types</p>
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
    // Dropdown,
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

// Styling for type dropdown
.aselect {
  width: 280px;
  margin: 20px auto;
  .selector {
    border: 1px solid gainsboro;
    background: #F8F8F8;
    position: relative;
    z-index: 1;
    .arrow {
      position: absolute;
      right: 10px;
      top: 40%;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 10px solid #888;
      transform: rotateZ(0deg) translateY(0px);
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(.59,1.39,.37,1.01);
    }
    .expanded {
      transform: rotateZ(180deg) translateY(2px);
    }
    .label {
      display: block;
      padding: 12px;
      font-size: 16px;
      color: #888;
    }
  }
  // ul {
  //   width: 100%;
  //   list-style-type: none;
  //   padding: 0;
  //   margin: 0;
  //   font-size: 16px;
  //   border: 1px solid gainsboro;
  //   position: absolute;
  //   z-index: 1;
  //   background: #fff;
  // }
  // li {
  //   padding: 12px;
  //   color: #666;
  //   &:hover {
  //     color: white;
  //     background: seagreen;
  //   }
  // }
  .current {
    background: #eaeaea;
  }
  .hidden {
    visibility: hidden;
  }
  .visible {
    visibility: visible;
  }
}

// @media screen and (min-width: 25.9375rem) {

// }
</style>

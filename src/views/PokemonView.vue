<template>
  <div class="pokemonPage" :key="pokemon">
    <Loader v-if="isLoading" :full-page="true" />

    <DexNavigation v-if="!isLoading" :nextNum="nextNum" :prevNum="prevNum"/>

    <div class="pokemon-data" v-if="!isLoading">
      <div id="head" class="poke-head">
        <h1 class="pokedex-num">#{{ formatIndex(speciesInfo.id) }}</h1>

        <div class="pokemon-img-container">
          <img :src="photoUrl" alt="" class="pokemon-image" id="poke-img" v-on:click="showEasterEgg()" @error="imgUrlAlt" />
          <div class="shiny-slider" v-if="!form || parseInt(form) === speciesInfo.id">
            <span>Normal</span>
            <span class="shiny-switch">
              <SliderSwitch :propState="showShiny" :color="speciesInfo.color.name" v-on:toggle="toggleShiny($event)"/>
            </span>
            <span>Shiny</span>
          </div>
        </div>

        <!-- <PokeImg class="pokemon-image" :baseUrl="'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'" :dexNum="speciesInfo.id" :name="pokeName"/> -->

        <!-- Grab the base name of the Pokémon -->
        <h1 class="pokemon-name" id="pokemon-name">
          {{ pokeName }}
        </h1>

        <!-- Grab the type(s) of the Pokémon -->
        <div class="pokemon-types">
          <TypeBox
            v-for="(typeName, index) in types"
            v-bind:key="index"
            :typeName="typeName"
            size="small"
            :linkEnabled="true"
            >
              {{ toUpper(typeName) }}
          </TypeBox>
        </div>

        <div class="pokemon-desc">
          <p>
            A {{ getTyping(types) }} type Pokémon introduced in
            {{ getGeneration(speciesInfo.generation.name) }}.
            {{ getFlavorText(speciesInfo.flavor_text_entries) }}
          </p>
        </div>
      </div>

      <div class="alternateForms" v-if="alternateForms.length > 1 && speciesInfo.id !== 25">
        <strong>Forms: </strong>
        <!-- <p>
          {{ getAlternateForms(speciesInfo.varieties, pokeInfo.forms) }}
        </p> -->
        <div class="formBtns">
          <div
            class="formBtn"
            v-for="(formData, index) in alternateForms"
            :key="index"
            v-on:click="changeForm(formData.id, formData.type)"
            :aria-label="'Click to show form ' + toUpper(formData.name_formatted)"
          >
            <!-- Buttons for other unselected forms -->
            <Button size="medium" :color="speciesInfo.color.name" v-if="formData.id !== form && formData.id" > {{ toUpperEachWord(formData.name_formatted) }} </Button>
            <!-- Button for selected forms -->
            <Button size="medium" :color="speciesInfo.color.name" :inverted="true" v-if="formData.id === form" > {{ toUpperEachWord(formData.name_formatted) }} </Button>
          </div>
          <!-- <router-link v-if="!hasDefaultForm && form" :to="'/pokemon/' + pokemon" class="formBtn">
            <Button size="medium" :color="speciesInfo.color.name"> Default </Button>
          </router-link> -->
        </div>
      </div>

      <div
        id="basic-info"
        class="pokemon-basic-info"
        :class="'info-box border-' + speciesInfo.color.name"
      >
        <h3>Pokédex Data</h3>

        <p style="margin-bottom: 0"><strong>Abilities:</strong></p>

        <details v-for="(abilityInfo, index) in pokeInfo.abilities" :key="index" >
          <summary
            :id="'ab-' + abilityInfo.ability.name"
            class="poke-abilities"
            :class="'poke-ab-' + speciesInfo.color.name"
          >
            {{ getAbilityName(abilityInfo, index) }}
          </summary>
          <p
            :id="'ab-txt-' + abilityInfo.ability.name"
            :class="'poke-ab-txt-' + abilityInfo.ability.name"
          >
            {{ getAbilityDesc(index)  }}
          </p>
        </details>

        <p><strong>Genus:</strong> {{ getGenus(speciesInfo.genera) }}</p>

        <p>
          <strong>Color:</strong>
          <span :class="'color-' + speciesInfo.color.name">
            {{ toUpper(speciesInfo.color.name) }}
          </span>
        </p>

        <p><strong>Shape:</strong> {{ toUpper(speciesInfo.shape !== null ? speciesInfo.shape.name : '(Not found)') }}</p>

        <p>
          <strong>Height:</strong> {{ getHeight(pokeInfo.height) }} <br />
          <strong>Weight:</strong> {{ getWeight(pokeInfo.weight) }}
        </p>

        <p>
          <strong>Japanese Name:</strong>
          {{ getJapaneseName(speciesInfo.names) }}
        </p>
      </div>

      <div id="type-defenses" class="typeDefenses" :class="'info-box border-' + speciesInfo.color.name">
        <h3>Type Defenses</h3>
        <p>Effectiveness of each move typing on {{ toUpper(speciesInfo.name) }}</p>
        <TypeEffectiveness :typing="types" direction="from" />
      </div>

      <!-- Pokemon Training Info Box -->
      <div id="training" class="pokemon-training" :class="'info-box border-' + speciesInfo.color.name">
        <h3>Training</h3>
        <div class="poke-training-box">
          <div class="poke-evs-all">
            <h4>EV Yield</h4>

            <div class="poke-evs-3">
              <span
                class="poke-evs"
                v-for="(statInfo, index) in getStats(pokeInfo.stats)"
                :key="index"
                :class="'poke-ev-' + statInfo.stat_names.short.replace('.','').toLowerCase()"
              >
                <strong>{{ statInfo.stat_names.short }}</strong>
                <span>{{ statInfo.effort }}</span>
              </span>
            </div>
          </div>

          <div class="poke-training">
            <table class="poke-train-table">
              <tbody>
                <tr>
                  <td class="poke-train-c1"><strong>Base EXP:</strong></td>
                  <td class="poke-train-c2">{{ pokeInfo.base_experience }}</td>
                </tr>
                <tr>
                  <td class="poke-train-c1">
                    <strong>Base Happiness:</strong>
                  </td>
                  <td class="poke-train-c2">
                    {{ speciesInfo.base_happiness }}
                  </td>
                </tr>
                <tr>
                  <td class="poke-train-c1"><strong>Capture Rate:</strong></td>
                  <td class="poke-train-c2">{{ speciesInfo.capture_rate }}</td>
                </tr>
                <tr>
                  <td class="poke-train-c1"><strong>Growth Rate:</strong></td>
                  <td class="poke-train-c2">
                    {{ toUpper(speciesInfo.growth_rate.name) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="statsAndBreeding">
        <!-- Pokemon Stats Info Box -->
        <div
          id="stats"
          class="pokemon-stats"
          v-bind:class="'info-box border-' + speciesInfo.color.name"
        >
          <h3>Base Stats</h3>

          <table class="base-stats">
            <tbody>
              <tr v-for="(statInfo, index) in getStats(pokeInfo.stats)" :key="index">
                <td class="base-stats-c1" :class="'base-stat-' + statInfo.stat_names.short.replace('.','').toLowerCase()">
                  <strong>{{ statInfo.stat_names.short }}:</strong>
                </td>
                <td class="base-stats-c2">{{ statInfo.base_stat }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pokemon Breeding Info Box -->
        <div
          id="breeding"
          class="pokemon-breeding"
          v-bind:class="'info-box border-' + speciesInfo.color.name"
        >
          <h3>Breeding Info</h3>
          <p>
            <strong>Gender Rate:</strong>
            {{ getGenderRate(speciesInfo.gender_rate) }}
          </p>
          <p>
            <strong>Egg-Group(s):</strong>
            {{ getEggGroups(speciesInfo.egg_groups) }}
          </p>
          <p>
            <strong>Hatching:</strong>
            {{ calcHatching(speciesInfo.hatch_counter) }}
          </p>
        </div>
      </div>

      <!-- Evolution Chain data -->
      <div id="evolutions" class="evoChain" :class="'info-box border-' + speciesInfo.color.name">
        <!-- <h3>Evolution Chain</h3> -->
        <h3>Evolutions</h3>
        <EvolutionChain :chain="speciesInfo.evolution_chain == null ? 'None' : getId(speciesInfo.evolution_chain.url)" />
      </div>

      <!-- Pokemon Dex Entries Info Box -->
      <!-- <div class="pokemon-generation-dex-entries" v-bind:class="'poke-info' + speciesInfo.color.name">
                COMING SOON
            </div> -->
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import Loader from '@/components/Loader'
import TypeEffectiveness from '@/components/pokemon/TypeEffectiveness'
import DexNavigation from '@/components/pokemon/DexNavigation'
import EvolutionChain from '@/components/pokemon/EvolutionChain'
import Button from '@/components/Button'
import SliderSwitch from '@/components/SliderSwitch'
import TypeBox from '@/components/types/TypeBox'
// import PokeImg from '../components/pokemon/PokeImg.vue'

const pokeApi = RepositoryFactory.get('pokeApi')
const util = RepositoryFactory.get('util')
const img = RepositoryFactory.get('img')

const statMap = {
  hp: { short: 'HP', long: 'HP' },
  attack: { short: 'Atk', long: 'Attack' },
  defense: { short: 'Def', long: 'Defense' },
  special_attack: { short: 'Sp.Atk', long: 'Special Attack' },
  special_defense: { short: 'Sp.Def', long: 'Special Defense' },
  speed: { short: 'Speed', long: 'Speed' }
}

const StatRepo = {
  get: stat => statMap[stat.replace('-', '_')]
}

export default {

  name: 'PokemonView',
  components: {
    Loader,
    Button,
    TypeEffectiveness,
    DexNavigation,
    EvolutionChain,
    SliderSwitch,
    TypeBox
    // PokeImg
  },
  data () {
    return {
      pokemon: router.currentRoute.params.name,
      form: router.currentRoute.params.form,
      formType: router.currentRoute.query.formType,
      isLoading: true,
      speciesInfo: null,
      pokeInfo: null,
      formInfo: null,
      // types: null,
      showShiny: false,
      pokeName: null,
      abilityList: [],
      nextNum: null,
      prevNum: null,
      navigating: false,
      timeout: null,
      timer: 0,
      locales: [],
      title: ' - Pokémon'
    }
  },
  mounted () {
    this.fetch()
    this.locales = util.getUserLocales()
  },
  updated () {
    if (this.navigating) {
      this.formInfo = null
      this.fetch()
      this.navigating = false
    }
  },
  methods: {
    async fetch () {
      this.isLoading = true

      var { data } = await pokeApi.getPokemonSpecies(this.pokemon) // eslint-disable-line
      this.speciesInfo = data // eslint-disable-line 
      this.pokeName = this.getEntryForLocale(this.speciesInfo.names).name

      var { data } = await pokeApi.getPokemon(this.pokemon) // eslint-disable-line
      this.pokeInfo = data // eslint-disable-line

      if (this.form) {
        var formInd = this.alternateForms.findIndex(form => {
          return form.id === this.form
        })

        if (formInd >= 0) {
          switch (this.formType) {
            case 'form':
              var { data } = await pokeApi.getPokemonForm(this.form) // eslint-disable-line
              this.formInfo = data // eslint-disable-line
              break

            case 'variety':
              var { data } = await pokeApi.getPokemon(this.form) // eslint-disable-line
              this.pokeInfo = data // eslint-disable-line

              // var { data } = await pokeApi.getPokemonForm(this.pokeInfo.forms[0])
              // this.formInfo = data
              break

            default:
              this.form = null
              this.changeForm(null, null)
              break
          }
        } else {
          this.form = null
          this.changeForm(null, null)
        }
      }

      var { data } = await pokeApi.getCurrentTotalPokemon() // eslint-disable-line
      this.totalPokemon = data.count // eslint-disable-line

      // Set the prev Pokedex num and next Pokedex num
      if ((this.speciesInfo.id - 1) < 1) this.prevNum = this.totalPokemon
      else this.prevNum = this.speciesInfo.id - 1
      if ((this.speciesInfo.id + 1) > this.totalPokemon) this.nextNum = 1
      else this.nextNum = this.speciesInfo.id + 1

      // Get the details for abilities of Pokemon
      this.abilityList = []
      for (var i = 0; i < this.pokeInfo.abilities.length; i++) {
        var abilityInfo = this.pokeInfo.abilities[i]
        var { data } = await pokeApi.getAbility(abilityInfo.ability.name) // eslint-disable-line
        this.storeAbilityData(data) // eslint-disable-line
      }

      document.title = '#' + this.formatIndex(this.speciesInfo.id) + ' ' + this.pokeName + this.title // set site title to pokemon name

      this.isLoading = false
    },

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

    getTyping (types) {
      if (types.length > 1) {
        return util.toUpper(types[0]) + ' & ' + util.toUpper(types[1])
      } else {
        return util.toUpper(types[0])
      }
    },

    getGeneration (gen) {
      var split = gen.split('-')
      return util.toUpper(split[0]) + ' ' + split[1].toUpperCase()
    },

    getFlavorText (data) {
      return util.tryData(this.getEntryForLocale(data), 'flavor_text')
    },

    changeForm (toForm, type) {
      var currentRoute = this.$router.currentRoute

      if (currentRoute.params.form !== toForm) {
        if (toForm !== this.speciesInfo.id && toForm) {
          this.form = toForm
          this.$router.push({ name: 'pokePageAltForm', params: { name: this.pokemon, form: toForm }, query: { formType: type } })
        } else {
          this.form = null
          this.$router.push({ name: 'pokePageDirect', params: { name: this.pokemon } })
        }
      }
    },

    storeAbilityData (data) {
      var effectEntry = this.getEntryForLocale(data.effect_entries)
      var flavorTextEntry = this.getEntryForLocale(data.flavor_text_entries)

      var shortDesc, longDesc, flavorText

      if (this.checkNull(effectEntry)) {
        shortDesc = null
        longDesc = null
      } else {
        shortDesc = effectEntry.short_effect
        longDesc = effectEntry.effect
      }

      if (this.checkNull(flavorTextEntry)) flavorText = null; else flavorText = flavorTextEntry.flavor_text

      this.abilityList.push({
        name: data.name,
        names: data.names,
        short_desc: shortDesc,
        long_desc: longDesc,
        flavor_text: flavorText
      })
    },

    getAbilityName (info, num) {
      var ability = this.abilityList[num]
      var name = this.getEntryForLocale(ability.names).name
      if (info.is_hidden) {
        return name + ' (hidden)'
      } else {
        return name
      }
    },

    getAbilityDesc (num) {
      if (this.abilityList[num].short_desc !== null) {
        return this.abilityList[num].short_desc
      } else {
        return this.abilityList[num].flavor_text
      }
    },

    getGenus (data) {
      // return this.getEntryForLocale(data).genus
      return util.tryData(this.getEntryForLocale(data), 'genus', '(Not found)')
    },

    getWeight (data) {
      var weightMetric = data / 10
      var weightUs = Math.round(weightMetric * 2.20462262185)
      return weightMetric + ' kg  |  ' + weightUs + ' lbs'
    },

    getHeight (data) {
      var heightMetric = data / 10

      var inches = heightMetric * 39.37007874
      var feet = Math.floor(inches / 12)

      var inchesR = Math.round(inches % 12)

      return heightMetric + ' m  |  ' + feet + ' ft ' + inchesR + ' in'
    },

    getJapaneseName (data) {
      var japaneseName = ''
      for (var i = 0; i < data.length; i++) {
        var entry = data[i]
        if (entry.language.name === 'ja') {
          japaneseName += entry.name
        }
      }
      for (var j = 0; j < data.length; j++) {
        var entry2 = data[j]
        if (entry2.language.name === 'roomaji') {
          japaneseName += ' (' + entry2.name + ')'
        }
      }

      return japaneseName
    },

    getStats (stats) {
      var statArr = []
      stats.forEach(stat => {
        statArr.push({
          base_stat: stat.base_stat,
          effort: stat.effort,
          stat_names: StatRepo.get(stat.stat.name)
        })
      })
      return statArr
    },

    getGenderRate (rate) {
      if (rate >= 0) {
        var femRate = (rate / 8) * 100
        var maleRate = 100 - femRate

        if (femRate === 100) {
          return '100% Female'
        } else if (maleRate === 100) {
          return '100% Male'
        } else {
          return maleRate + '% Male, ' + femRate + '% Female'
        }
      } else {
        return 'Genderless'
      }
    },

    calcHatching (data) {
      var eggWalkAmt = data * 256
      return data + ' egg cycles (' + eggWalkAmt + ' steps)'
    },

    getEggGroups (data) {
      var groups = ''

      for (var i = 0; i < data.length; i++) {
        if (i > 0 && i <= data.length) {
          groups += ' & '
        }

        switch (data[i].name) {
          case 'no-eggs':
            groups += 'Undiscovered'
            break
          case 'water1':
            groups += 'Water 1'
            break
          case 'water2':
            groups += 'Water 2'
            break
          case 'water3':
            groups += 'Water 3'
            break
          case 'humanshape':
            groups += 'Human-Like'
            break
          case 'indeterminate':
            groups += 'Amorphous'
            break
          case 'ground':
            groups += 'Field'
            break
          default:
            groups += util.toUpper(data[i].name)
            break
        }
      }

      return groups
    },

    toggleShiny (e) {
      // console.log(e)
      if (this.timer === 0) {
        // console.log('toggling shiny on/off')
        this.showShiny = e
        // console.log(this.showShiny)
        this.timer = 1

        clearTimeout(this.timeout)

        var that = this
        this.timeout = setTimeout(function () {
          that.timer = 0
        }, 1)
      }
    },

    showEasterEgg () {
      var origName = this.pokeName

      switch (origName) {
        case 'Lapras':
          this.pokeName = 'Joy'
          break
        case 'Charjabug':
          this.pokeName = 'Strugglebus'
          break
        case 'Omanyte':
          this.pokeName = 'Lord Helix'
          break
        case 'Farfetch’d':
          this.pokeName = 'Bird Jesus'
          break
        case 'Virizion':
          this.pokeName = 'Verizon'
          break
      }

      var that = this
      setTimeout(function () {
        that.pokeName = origName
      }, 2000)
    },

    // navigateDex (event) {
    //   this.pokemon = event
    //   this.navigating = true
    // },

    checkNull (data) {
      if (!data) return true
      else return false
    },

    imgUrlAlt (event) {
      if (this.form) {
        switch (this.formType) {
          case 'form':
            if (this.formInfo.sprites.front_default !== null) event.target.src = this.formInfo.sprites.front_default
            else event.target.src = img.getPokemonImageUrl(util.formatIndex(this.speciesInfo.id))
            break

          case 'variety':
            event.target.src = this.pokeInfo.sprites.front_default
            break
        }
      } else {
        event.target.src = img.getPokemonImageUrl(util.formatIndex(this.speciesInfo.id))
      }
    },

    splitName (value) {
      return util.splitName(value, '-')
    },

    getId (url) {
      return util.getId(url)
    },

    getEntryForLocale (data) {
      var entry

      if (!entry) {
        data.forEach(item => {
          if (item.language.name === 'en') {
            entry = item
          }
        })
      }

      return entry
    }
  },
  computed: {
    photoUrl () {
      // if (this.form) {
      if (this.form && parseInt(this.form) !== this.speciesInfo.id) {
        if (this.speciesInfo.id === 351) {
          // Logic for forms of specific pokemon, which don't work well for images
          return this.pokeInfo.sprites.front_default
        } else {
          var formToFind = this.form
          var formId = this.alternateForms.findIndex(form => {
            return formToFind === form.id
          })

          if (formId >= 0) {
            return img.getPokemonAltFormImageUrl(util.formatIndex(this.speciesInfo.id), formId + 1)
          } else {
            return ''
          }
        }
      } else if (this.showShiny) {
        return img.getPokemonShinyImageUrl(util.formatIndex(this.speciesInfo.id))
      } else return img.getPokemonImageUrl(util.formatIndex(this.speciesInfo.id))
    },
    alternateForms () {
      var varietiesFormatted = []
      var formsFormatted = []

      var varietyAmt = this.speciesInfo.varieties.length
      var formAmt = this.pokeInfo.forms.length

      if (this.speciesInfo.id === 774 || this.speciesInfo.id === 718 || this.speciesInfo.id === 555 ||
          this.speciesInfo.id === 646 || this.speciesInfo.id === 849 || this.speciesInfo.id === 658 || this.speciesInfo.id === 83) { // special logic for specific Pokemon
        varietiesFormatted = pokeApi.getSpecialCaseForms(this.speciesInfo.id)
        return varietiesFormatted
      } else if (this.speciesInfo.id === 710 || this.speciesInfo.id === 711 || this.speciesInfo.id === 716) { // special logic for only pumpkaboo, gourgeist, xernas
        return []
      } else {
        this.speciesInfo.varieties.forEach(variety => {
          if (variety.pokemon.name.toUpperCase() === this.pokeName.toUpperCase() && varietyAmt > 1 && formAmt === 1 && !variety.pokemon.name.includes('-totem')) {
            varietiesFormatted.push({
              name: variety.pokemon.name,
              name_formatted: 'Base',
              id: this.getId(variety.pokemon.url),
              type: 'variety',
              is_default: variety.is_default
            })
          } else if (variety.pokemon.name.toUpperCase() !== this.pokeName.toUpperCase() && !variety.pokemon.name.includes('-totem')) {
            varietiesFormatted.push({
              name: variety.pokemon.name,
              name_formatted: this.splitName(variety.pokemon.name).replace(this.pokeName.toLowerCase() + ' ', ''),
              id: this.getId(variety.pokemon.url),
              type: 'variety',
              is_default: variety.is_default
            })
          }
        })

        if (varietyAmt > 1 || formAmt <= 2) {
          this.pokeInfo.forms.forEach(form => {
            var varietyNames = []
            varietiesFormatted.forEach(variety => {
              varietyNames.push(variety.name)
            })

            if (!varietyNames.includes(form.name) && (form.name.toUpperCase() !== this.pokeName.toUpperCase()) && !form.name.includes('-totem')) {
              formsFormatted.push({
                name: form.name,
                name_formatted: this.splitName(form.name).replace(this.pokeName.toLowerCase() + ' ', ''),
                id: this.getId(form.url),
                type: 'form',
                is_default: null
              })
            }
          })
        }

        return varietiesFormatted.concat(formsFormatted)
      }
    },
    hasDefaultForm () {
      var hasDefault = false
      // var altForms = this.getAlternateForms(this.speciesInfo.varieties, this.pokeInfo.forms)

      this.alternateForms.forEach(alt => {
        if (alt.is_default) hasDefault = true
      })

      return hasDefault
    },
    types () {
      const typeArr = []
      if (this.formInfo) {
        this.formInfo.types.forEach(typeData => {
          console.log(typeData)
          typeArr.push(typeData.type.name)
        })
        // return this.formInfo.types
        return typeArr
      } else {
        this.pokeInfo.types.forEach(typeData => {
          console.log(typeData)
          typeArr.push(typeData.type.name)
        })
        // return this.formInfo.types
        return typeArr
      }
      // else return this.pokeInfo.types
    }
  },
  watch: {
    $route: function (to, from) {
      this.pokemon = 0
      this.form = 0
      this.formType = null

      if (to.params.form && to.query.formType) {
        this.form = to.params.form
        this.formType = to.query.formType
      }
      this.pokemon = to.params.name

      this.navigating = true
      // location.reload()
    }
  }

}
</script>

<style scoped lang="scss">

@import '../styling/types.scss';
@import '../styling/colors.css';

.poke-head {
  max-width: 46.875rem;
  margin: 0 auto;
}

.pokemon-img-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
}

.pokemon-image {
  margin-top: 1rem;
  height: 12rem;
}

.shiny-slider {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
}

.shiny-switch {
  margin: 0 1rem 0 1rem;
}

/* Type styling */
.pokemon-types {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

[class*="type-"] {
  border-radius: 0.625rem;

  padding: 0.2rem 1rem;
  margin: 0 0.5rem;
  min-width: 5.625rem;
  text-align: center;

  /* cursor: pointer; */
}

.alternateForms{
  display: flex;
  flex-direction: column;
  // align-items: center;
}
.alternateForms > strong {
  margin-right: 0.5rem;
}
.formBtns {
  display: flex;
  flex-direction: row;
  overflow: scroll;
  margin: 0.5rem 0 0.5rem;
}
.formBtn {
  margin: 0 0.5rem 0.5rem;
}

/* Info styling */

/* Info boxes */
.pokemon-desc {
  text-align: left;
  margin: 0 1rem;
}

/* Pokedex Data */
.poke-abilities {
  cursor: pointer;
}

/* Training info */

.poke-training-box {
  display: flex;
  flex-direction: column;
}

.poke-evs-all {
  display: flex;
  flex-direction: column;
}
.poke-evs-all > h4 {
  margin: 0;
  margin-bottom: 0.5rem;
}

.poke-evs-3 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 1rem 1rem;
  max-width: 15rem;
}

.poke-evs {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
}

[class*="poke-ev-"] {
  min-width: 4rem;

  border-radius: 0.625rem;

  padding: 0.2rem 0;
  margin: 0.5rem;

  text-align: center;
}
.poke-ev-hp {
  border: 2px solid #ff5959;
  background-color: rgba(255, 89, 89, 0.3);
}
.poke-ev-atk {
  border: 2px solid #f5ac78;
  background-color: rgba(245, 172, 120, 0.3);
}
.poke-ev-def {
  border: 2px solid #fae078;
  background-color: rgba(250, 224, 120, 0.3);
}
.poke-ev-spatk {
  border: 2px solid #65aff7;
  background-color: rgba(101, 175, 247, 0.3);
}
.poke-ev-spdef {
  border: 2px solid #7ddb7d;
  background-color: rgba(125, 219, 125, 0.3);
}
.poke-ev-speed {
  border: 2px solid #f755c1;
  background-color: rgba(247, 85, 193, 0.3);
}

.poke-train-table {
  border-collapse: separate;
  border-spacing: 0 1rem;
}
.poke-train-c1 {
  text-align: right;
}
.poke-train-c2 {
  padding-left: 1rem;
}

/* Base Stats & Breeding Box styling */

.statsAndBreeding {
  display: flex;
  flex-direction: column;
}

/* Base Stats info */
.pokemon-stats > h3 {
  margin-bottom: 0;
}

.base-stats {
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1rem;
  border-spacing: 0 0.5rem;
}
.base-stats-c1 {
  text-align: right;
}
.base-stats-c2 {
  padding-left: 1rem;
}

.base-stat-hp {
  color: #ff5959;
}
.base-stat-atk {
  color: #f5ac78;
}
.base-stat-def {
  color: #e7cf6d;
}
.base-stat-spatk {
  color: #65aff7;
}
.base-stat-spdef {
  color: #7ddb7d;
}
.base-stat-speed {
  color: #f755c1;
}

@media screen and (min-width: 25.9375rem) {
  .alternateForms {
    flex-direction: row;
    align-items: center;
  }
  .formBtns {
    overflow: visible;
    // justify-content: center;
    text-align: left;
    flex-wrap: wrap;
  }

  .pokemon-data {
    margin: 0 auto;
    padding: 0;
    max-width: 46.875rem;
    display: flex;
    flex-direction: column;
  }

  .poke-training-box {
    flex-direction: row;
  }

  .pokemon-image {
    height: 16rem;
  }

  .statsAndBreeding {
    flex-direction: row;
    justify-content: space-between;
  }
  .pokemon-stats {
    width: 28%;
  }
  .base-stats {
    text-align: center;
  }
  .pokemon-breeding {
    width: 68%;
  }

  .poke-ab-black:hover { color: #323232;}
  .poke-ab-blue:hover { color: #3482DE;}
  .poke-ab-brown:hover { color: #AF891F;}
  .poke-ab-gray:hover { color: #707070;}
  .poke-ab-green:hover { color: #64A743;}
  .poke-ab-pink:hover { color: #E97698;}
  .poke-ab-purple:hover { color: #7C63B8;}
  .poke-ab-red:hover { color: #EF4036;}
  .poke-ab-white:hover { color: #aaaaaa;}
  .poke-ab-yellow:hover { color: #F8D030;}
}
</style>

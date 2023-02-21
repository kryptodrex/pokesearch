<template>
  <div>
    <Loader v-if="isLoading" class="loaderBall" type="ball" size="medium" />
    <div v-if="!isLoading" class="evolutionChain">
      <div class="evoLevels" v-if="evoDetails.length > 1">
        <!-- <div v-for="(evo, index) in evoDetails" :key="index" :class="'evoLevel' + evo.level">
          <PokeBox :dexNum="getId(evo.species.url)" :name="evo.species.name" />
        </div> -->
        <div class="evoLevel0">
          <PokeBox v-for="(evo, index) in getEvoLevelDetails(0)" :key="index" :dexNum="getId(evo.species.url)" :name="evo.species.name" />
        </div>
        <div class="evoLevel1">
          <PokeBox v-for="(evo, index) in getEvoLevelDetails(1)" :key="index" :dexNum="getId(evo.species.url)" :name="evo.species.name" />
        </div>
        <div class="evoLevel2">
          <PokeBox v-for="(evo, index) in getEvoLevelDetails(2)" :key="index" :dexNum="getId(evo.species.url)" :name="evo.species.name" />
        </div>
      </div>
      <h4 v-if="evoDetails.length <= 1">This Pokémon does not evolve!</h4>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import Loader from '@/components/Loader'
import PokeBox from '@/components/pokemon/PokeBox'

const pokeApi = RepositoryFactory.get('pokeApi')
const util = RepositoryFactory.get('util')

export default {
  name: 'EvolutionChain',
  components: {
    Loader,
    PokeBox
  },
  props: {
    chain: String
  },
  data () {
    return {
      isLoading: false,
      evoDetails: [],
      evoLvl: 0
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.isLoading = true

      if (this.chain !== 'None') {
        var { data } = await pokeApi.getEvolutionChain(this.chain)
        this.evoDetails.push(this.createEvoObj(data.chain))
        this.traverseChain(data.chain.evolves_to)
      }

      this.isLoading = false
    },

    traverseChain (data) {
      this.evoLvl++

      data.forEach(item => {
        this.evoDetails.push(this.createEvoObj(item))

        if (item.evolves_to.length !== 0) {
          this.traverseChain(item.evolves_to)
        }
      })
    },

    createEvoObj (data) {
      return {
        level: this.evoLvl,
        species: data.species,
        evo_details: data.evolution_details
      }
    },

    getEvoLevelDetails (num) {
      var levelArray = []

      this.evoDetails.forEach(item => {
        if (item.level === num) {
          levelArray.push(item)
        }
      })

      return levelArray
    },

    getId (value) {
      return util.getId(value)
    }

  }
}
</script>

<style scoped lang="css">

.evolutionChain {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.evoLevels {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.loaderBall {
  margin: 1rem;
}

/* Viewing on smaller phones, like iPhone SE */
@media screen and (max-width: 22.25rem) {

}

/* Viewing on large devices, like tablets and desktop */
@media screen and (min-width: 25.9375rem) {

}

</style>

import Repository from './pokeApiRepo'

var totalPokemon = {
  count: 0
}

var allSpecies = []
var allGens = []
var allTypes = []

export default {

  getPagedPokemonSpecies (limit, offset) {
    return Repository.get(`/pokemon-species?limit=${limit}&offset=${offset}`)
  },

  getCurrentTotalPokemon () {
    if (totalPokemon.count == 0) {
      totalPokemon = Repository.get(`/pokemon-species?limit=1`)
      return totalPokemon
    } else {
      return totalPokemon
    }
  },

  getPokemon (pokemon) {
    return Repository.get(`/pokemon/${pokemon}`)
  },

  getPokemonForm (pokemon) {
    return Repository.get(`/pokemon-form/${pokemon}`)
  },

  getAllPokemonSpecies () {
    if (allSpecies.length == 0) {
      allSpecies = Repository.get(`/pokemon-species?limit=99999`)
      return allSpecies
    } else {
      return allSpecies
    }
  },

  getPokemonSpecies (pokemon) {
    return Repository.get(`/pokemon-species/${pokemon}`)
  },

  getEvolutionChain (id) {
    return Repository.get(`/evolution-chain/${id}`)
  },

  getAllGenerations () {
    if (allGens.length == 0) {
      allGens = Repository.get(`/generation`)
      return allGens
    } else {
      return allGens
    };
  },

  getGeneration (gen) {
    return Repository.get(`/generation/${gen}`)
  },

  getAbility (ability) {
    return Repository.get(`/ability/${ability}`)
  },

  getAllTypes () {
    if (allTypes.length == 0) {
      allTypes = Repository.get(`/type?limit=100`)
      return allTypes
    } else {
      return allTypes
    }
  },

  getType (type) {
    return Repository.get(`/type/${type}`)
  },

  getLocation (loc) {
    return Repository.get(`/location/${loc}`)
  }

}

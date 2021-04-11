import Repository from "./pokeApiRepo";

var totalPokemon = {
  count: 0
};

var allSpecies = []
var allGens = []

export default {

  async storePokemonSpeciesList() {
    var { data } = await Repository.get(`/pokemon-species?limit=9999`);
    allSpecies = data.results;
  },

  getPagedPokemonSpecies(limit, offset) {
    return Repository.get(`/pokemon-species?limit=${limit}&offset=${offset}`);
  },

  getCurrentTotalPokemon() {
    if (totalPokemon.count == 0) {
      totalPokemon = Repository.get(`/pokemon-species?limit=1`)
      return totalPokemon;
    } else {
      return totalPokemon;
    }
  },

  getPokemon(pokemon) {
    return Repository.get(`/pokemon/${pokemon}`);
  },

  getPokemonSpecies(pokemon) {
    return Repository.get(`/pokemon-species/${pokemon}`);
  },

  getAllGenerations() {
    if (allGens.length == 0) {
      allGens = Repository.get(`/generation`);
      return allGens;
    } else {
      return allGens;
    };
  },

  getGeneration(gen) {
    return Repository.get(`/generation/${gen}`);
  },

  getAbility(ability) {
    return Repository.get(`/ability/${ability}`);
  },

  getAllTypes() {
    return Repository.get(`/type?limit=100`);
  },

  getType(type) {
    return Repository.get(`/type/${type}`);
  }
  
};
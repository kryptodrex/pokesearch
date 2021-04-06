import Repository from "./pokeApiRepo";

var totalPokemon = {
  count: 0
};

var allSpecies = []

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
      return Repository.get(`/pokemon-species?limit=1`);
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
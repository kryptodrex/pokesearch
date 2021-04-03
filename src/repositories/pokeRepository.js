import Repository from "./pokeApiRepo";

export default {

  getAllPokemonSpecies(limit, offset) {
    return Repository.get(`/pokemon-species?limit=${limit}&offset=${offset}`);
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
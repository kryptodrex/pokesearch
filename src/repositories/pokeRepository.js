import Repository from "./pokeApiRepo";

export default {
  getPokemonImageUrl(num) {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${num}.png`
  },

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
  }
};
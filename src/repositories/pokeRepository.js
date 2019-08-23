import Repository from "./repository";

// const resource = "/posts";
export default {
  getAllPokemonSpecies() {
    return Repository.get(`/pokemon-species?&limit=9999`);
  },

  getPokemon(pokemon) {
    return Repository.get(`/pokemon/${pokemon}`);
  },

  getPokemonSpecies(pokemon) {
    return Repository.get(`/pokemon-species/${pokemon}`);
  }
};

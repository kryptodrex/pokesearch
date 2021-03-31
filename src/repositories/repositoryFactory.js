import PokeRepository from "./pokeRepository";

const repositories = {
  pokeApi: PokeRepository,
  // other repositories ...
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
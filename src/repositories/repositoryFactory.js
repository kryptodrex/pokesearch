import PokeRepository from "./pokeRepository";

const repositories = {
  pokes: PokeRepository,
  // other repositories ...
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
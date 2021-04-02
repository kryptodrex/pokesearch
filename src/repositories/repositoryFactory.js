import PokeRepository from "./pokeRepository";
import UtilRepository from "./utilityRepository"

const repositories = {
  pokeApi: PokeRepository,
  util: UtilRepository
  // other repositories ...
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
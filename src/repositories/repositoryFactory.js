import PokeRepository from './pokeRepository'
import UtilRepository from './utilityRepository'
import ImgRepository from './imgRepository'

const repositories = {
  pokeApi: PokeRepository,
  util: UtilRepository,
  img: ImgRepository
  // other repositories ...
}

export const RepositoryFactory = {
  get: name => repositories[name]
}

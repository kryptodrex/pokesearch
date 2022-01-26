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
      totalPokemon = Repository.get('/pokemon-species?limit=1')
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

  getSpecialCaseForms (id) {
    var formsList = []

    switch (id) {
      case 774: // case for Minior's forms
        formsList.push({
          name: 'minior',
          name_formatted: 'Meteor',
          id: 774,
          type: 'variety',
          is_default: true
        })
        formsList.push({
          name: 'minior-core',
          name_formatted: 'Core',
          id: 10130,
          type: 'variety',
          is_default: false
        })
        return formsList

      case 718: // case for Zygarde's forms
        formsList.push({
          name: 'zygarde',
          name_formatted: '50%',
          id: 718,
          type: 'variety',
          is_default: true
        })
        formsList.push({
          name: 'zygarde-10',
          name_formatted: '10%',
          id: 10118,
          type: 'variety',
          is_default: false
        })
        formsList.push({
          name: 'zygarde-complete',
          name_formatted: 'Complete',
          id: 10120,
          type: 'variety',
          is_default: false
        })
        return formsList

      case 555: // case for Darmanitan's forms
        formsList.push({
          name: 'darmanitan',
          name_formatted: 'Base',
          id: 555,
          type: 'variety',
          is_default: true
        })
        formsList.push({
          name: 'darmanitan-galar',
          name_formatted: 'Galar',
          id: 10174,
          type: 'variety',
          is_default: false
        })
        formsList.push({
          name: 'darmanitan-zen',
          name_formatted: 'Zen',
          id: 10017,
          type: 'variety',
          is_default: false
        })
        formsList.push({
          name: 'darmanitan-zen-galar',
          name_formatted: 'Zen Galar',
          id: 10175,
          type: 'variety',
          is_default: false
        })
        return formsList

      case 646: // case for Kyurem's forms
        formsList.push({
          name: 'kyurem',
          name_formatted: 'Base',
          id: 646,
          type: 'variety',
          is_default: true
        })
        formsList.push({
          name: 'kyurem-white',
          name_formatted: 'White Kyurem',
          id: 10023,
          type: 'variety',
          is_default: false
        })
        formsList.push({
          name: 'kyurem-black',
          name_formatted: 'Black Kyurem',
          id: 10022,
          type: 'variety',
          is_default: false
        })
        return formsList

      case 849: // case for Toxtricity's forms
        formsList.push({
          name: 'toxtricity-low-key',
          name_formatted: 'Low Key',
          id: 849,
          type: 'variety',
          is_default: true
        })
        formsList.push({
          name: 'toxtricity-amped',
          name_formatted: 'Amped',
          id: 10178,
          type: 'variety',
          is_default: false
        })
        formsList.push({
          name: 'toxtricity-gmax',
          name_formatted: 'Gmax',
          id: 10210,
          type: 'variety',
          is_default: false
        })
        return formsList

      case 658: // case for Greninja's forms
        formsList.push({
          name: 'greninja',
          name_formatted: 'Base',
          id: 658,
          type: 'variety',
          is_default: true
        })
        formsList.push({
          name: 'greninja-ash',
          name_formatted: 'Ash Greninja',
          id: 10117,
          type: 'variety',
          is_default: false
        })
        return formsList

      case 83: // case for Farfetch'd's forms
        formsList.push({
          name: 'farfetchd',
          name_formatted: 'Base',
          id: 83,
          type: 'variety',
          is_default: true
        })
        formsList.push({
          name: 'farfetchd-galar',
          name_formatted: 'Galar',
          id: 10163,
          type: 'variety',
          is_default: false
        })
        return formsList
    }
  },

  getAllPokemonSpecies () {
    if (allSpecies.length == 0) {
      allSpecies = Repository.get('/pokemon-species?limit=99999')
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
      allGens = Repository.get('/generation')
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
      allTypes = Repository.get('/type?limit=100')
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


export default {
  getPokemonImageUrl (num) {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${num}.png`
  },

  getPokemonShinyImageUrl (num) {
    return `https://www.serebii.net/Shiny/SV/new/${num}.png`
  },

  getPokemonAltFormImageUrl (num, formNum) {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${num}_f${formNum}.png`
  }
}
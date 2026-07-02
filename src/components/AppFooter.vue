<template>
  <div class="footerSection">
    <footer>
      <p class="footer-version">PokéSearch v{{ version }}</p>
      <p>
        All images are owned by Pokémon™, ® Nintendo. Data from <a class="regLink" href="https://pokeapi.co" target="_blank">PokéAPI</a>.
      </p>
    </footer>
  </div>
</template>

<script>
import version from '../../version?raw'

export default {
  name: 'AppFooter',
  data () {
    return {
      version: version.trim()
    }
  }
}
</script>

<style scoped lang="scss">

.footerSection {
  display: flex;
  flex-direction: column;
}

footer {
  width: auto;
  border-radius: $radius-md;
  background-color: $color-footer-bg;
  color: white;
  text-align: center;
  margin: $space-md 0 $space-sm;
  padding: $space-md;
}

.regLink {
  display: unset;
  color: $color-error;
  font-weight: bold;
}

.footer-version {
  margin: 0 0 $space-xs;
  font-size: 0.85rem;
  opacity: 0.7;
}
</style>

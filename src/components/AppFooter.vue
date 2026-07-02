<template>
  <div class="footerSection">
    <footer>
      <p>
        All images are owned by Pokémon™, ® Nintendo. Data from <a class="regLink" href="https://pokeapi.co" target="_blank">PokéAPI</a>.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
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
</style>

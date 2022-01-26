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
  name: 'Footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">

.footerSection {
  display: flex;
  flex-direction: column;

}

footer {
  width: auto;
  /* margin: 0.7rem; */
  margin-top: 1rem;
  border-radius: 0.625rem;
  background-color: #4a4a4a;
  color: white;
  text-align: center;
  bottom: 0;
  margin: 1rem 0 0.5rem;
  padding: 1rem;
}

.regLink {
  display: unset;
  color: rgb(199, 95, 95);
  font-weight: bold;
}
</style>

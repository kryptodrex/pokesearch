<template>
  <header class="header-pokepage">
    <div class="header-text">
        <router-link to="/">
            <img class="logo" src="../assets/images/pokesearch-icon.svg" alt="PokeSearch Logo">
        </router-link>
        <h1 class="site-name">PokéSearch</h1>
    </div>

    <div class="header-search">
      <div class="search-box">
        <input class="header-search-input" type="text" id="poke-search" name="p" value="" placeholder="Enter a Pokémon...">
        <input class="header-search-submit" type="submit" id="submit" value="GO!">
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: 'header',
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
header {
    width: auto;
    padding: 1rem;
    /* margin: 0.2rem; */
    /* margin-bottom: 0; */
    background-color: #ef5350;
    border-radius: 0.625rem;
    color: white;

    display: flex;
    flex-direction: row;
}

.header-pokepage {
    display: flex;
    align-items: center;
}
.header-text {
    flex-grow: 3;

    display: flex;
    align-items: center;
}

.logo {
    height: 3rem;
    margin-right: 1rem;
}

.site-name {
    margin: 0;
    display: none;
    font-family: 'QSMed', Arial, Helvetica, sans-serif;
}

.header-search-input:hover {
    border: 1px solid #707070;
}
.header-search-input:focus {
    border: 1px solid #707070;
}
.header-search-submit { /* for poke_page only */
    /* border: 1px solid white; */
    background-color: #f1f1f1;
    color: #ef4036;
}
.header-search-submit:hover { /* for poke_page only */
    border: 1px solid #f1f1f1;
    background-color: #4A4A4A;
    color: #f1f1f1;
}

/* Styling for desktop/tablet viewing */
@media screen and (min-width: 25.9375rem) {
  header {
      /* margin: 0.7rem;
      margin-bottom: 0; */
  }

  .site-name {
        margin: 0;
        display: block;
    }
}
</style>

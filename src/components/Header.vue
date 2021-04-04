<template>
  <header class="header-pokepage">
    <div class="header-text">
        <router-link to="/">
            <img class="logo" src="../assets/images/pokesearch-icon.svg" alt="PokeSearch Logo">
        </router-link>
        <h1 class="site-name">PokéSearch</h1>
    </div>

    <div class="header-search">
        <input class="header-search-input" type="text" id="poke-search" value="" placeholder="Enter a Pokémon...">
        <Button text="GO!" size="medium" color="white" />
    </div>
  </header>
</template>

<script>
import Button from '@/components/Button';

export default {
  name: 'Header',
  components: {
      Button
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
header {
    width: auto;
    padding: 1rem;
    /* margin: 0.2rem; */
    margin-bottom: 1rem;
    background-color: rgb(201, 38, 63);
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

.header-search {
    display: flex;
    flex-direction: row;
}

.header-search-input {
    margin-right: 0.5rem;
}
.header-search-input:hover {
    border: 1px solid #707070;
    transition: 0.2s;
}
.header-search-input:focus {
    border: 1px solid #707070;
    transition: 0.2s;
}


@media screen and (max-width: 22.25rem) {
    .header-text {
        width: 100%;
        justify-content: center;
        text-align: center;
    }

    .logo {
        height: 2rem;
        margin: 0 0 0.2rem 0;
    }
    
    .header-pokepage {
        display: flex;
        flex-direction: column;
    }
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

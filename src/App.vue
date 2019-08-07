<template>
  <div id="app">
    <Header />
    <div class="router">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  cursor: url('assets/images/logo.svg'), auto !important;
}

/* Font Declaration */
@font-face {
    font-family: 'QSBold';
    src: url('assets/fonts/quicksand-bold-webfont.woff2') format('woff2'),
         url('assets/fonts/quicksand-bold-webfont.woff') format('woff');
    font-weight: bolder;
    font-style: normal;
}
@font-face {
    font-family: 'QSLight';
    src: url('assets/fonts/quicksand-light-webfont.woff2') format('woff2'),
         url('assets/fonts/quicksand-light-webfont.woff') format('woff');
    font-weight: lighter;
    font-style: normal;
}
@font-face {
    font-family: 'QSMed';
    src: url('assets/fonts/quicksand-medium-webfont.woff2') format('woff2'),
         url('assets/fonts/quicksand-medium-webfont.woff') format('woff');
    font-weight: bold;
    font-style: normal;
}
@font-face {
    font-family: 'QSReg';
    src: url('assets/fonts/quicksand-regular-webfont.woff2') format('woff2'),
         url('assets/fonts/quicksand-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

#app {
  font-family: 'QSReg', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.router {
  margin: 0 1rem;
}

body {
  margin: 0.5rem;
}

input {
    -webkit-appearance: none;
    -moz-appearance: none;
    font-family: 'QSReg', Arial, Helvetica, sans-serif;
    border: 1px solid transparent;
    border-radius: 3px;
    background-color: #f1f1f1;
    padding: 0.625rem;
    font-size: 1rem;
}
input[type="submit"]{
    font-family: 'QSMed', Arial, Helvetica, sans-serif;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>
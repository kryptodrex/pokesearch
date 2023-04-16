<template>
  <div id="app">
    <Header />
    <main>
      <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script>
import { RepositoryFactory } from '@/repositories/repositoryFactory'

const util = RepositoryFactory.get('util')

export default {
  name: 'App',
  mounted () {
    util.setUserLocales()
    console.log(util.getUserLocales())
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  outline: none;
  // cursor: url('assets/images/logo.svg'), auto !important;
}

html {
  height: 100%;
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
  font-size: 1.1rem;
  line-height: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  flex-grow: 1;
}

body {
  margin: 0;
  padding: 0 0.5rem;
  height: 100%;
}

.button {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

input {
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    font-family: 'QSReg', Arial, Helvetica, sans-serif;
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: #f1f1f1;
    padding: 0.625rem;
    font-size: 1rem;
}
input[type="submit"]{
    font-family: 'QSMed', Arial, Helvetica, sans-serif;
}

a {
  text-decoration: none;
  color: #4A4A4A;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.error {
  font-weight: bold;
  text-align: center;
  color: rgb(199, 95, 95);
}

.info-box {
  border-radius: 0.625rem;
  padding: 0 1rem;
  margin: 1rem 0;
  text-align: left;
  transition: 0.3s;
}
// .info-box:hover, .info-box:focus {
//   box-shadow: 0 4px 4px 0 rgba(0,0,0,0.20);
//   transition: 0.3s;
// }

// @media screen and (min-width: 25.9375rem) {
//   main {
//     max-width: 46.875rem;
//   }
// }

</style>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>


var userLocales = [];

export default {

    getPokemonImageUrl(num) {
        return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${num}.png`
    },

    findIndex(value) {
        if (value < 10) {
          return '00' + value;
        } else if (value < 100) {
          return '0' + value;
        } else {
          return value;
        }
    },

    toUpper(value) {
        return value[0].toUpperCase() + value.slice(1);
    },

    setUserLocales() {
        userLocales = this.getBrowserLocales({languageCodeOnly: true});
    },

    getUserLocales() {
        return userLocales;
    },

    getBrowserLocales(options = {}) {
        const defaultOptions = {
            languageCodeOnly: false,
        };

        const opt = {
            ...defaultOptions,
            ...options,
        };

        const browserLocales =
            navigator.languages === undefined
            ? [navigator.language]
            : navigator.languages;

        if (!browserLocales) {
            return undefined;
        }

        return browserLocales.map(locale => {
            const trimmedLocale = locale.trim();

            return opt.languageCodeOnly
            ? trimmedLocale.split(/-|_/)[0]
            : trimmedLocale;
        });
    }
    
};
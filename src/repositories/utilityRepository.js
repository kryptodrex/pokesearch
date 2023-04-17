
// var userLocales = [];

export default {

  getId (url) {
    var splitUrl = url.split('/')
    return splitUrl[6]
  },

  formatIndex (value) {
    if (value < 10) {
      return '00' + value
    } else if (value < 100) {
      return '0' + value
    } else {
      return value
    }
  },

  toUpper (value) {
    if (value !== '' && value !== null) {
      return value[0].toUpperCase() + value.slice(1)
    } else return value
  },

  splitName (value, delimiter, toUpper) {
    var nameArr = value.split(delimiter)
    var newName = ''

    if (nameArr.length > 1) {
      for (var i = 0; i < nameArr.length; i++) {
        var name
        if (toUpper) name = this.toUpper(nameArr[i])
        else name = nameArr[i]

        if (i < nameArr.length) {
          newName += name + ' '
        } else {
          newName += name
        }
      }
    }

    return newName
  },

  // setUserLocales() {
  //     userLocales = this.getBrowserLocales({languageCodeOnly: true});
  // },

  getUserLocales () {
    return this.getBrowserLocales({ languageCodeOnly: true })
  },

  getBrowserLocales (options = {}) {
    const defaultOptions = {
      languageCodeOnly: false
    }

    const opt = {
      ...defaultOptions,
      ...options
    }

    const browserLocales =
            navigator.languages === undefined
              ? [navigator.language]
              : navigator.languages

    if (!browserLocales) {
      return undefined
    }

    return browserLocales.map(locale => {
      const trimmedLocale = locale.trim()

      return opt.languageCodeOnly
        ? trimmedLocale.split(/-|_/)[0]
        : trimmedLocale
    })
  },

  tryData (data, key, returnStr = '') {
    var text
    try {
      text = data[key]
    } catch (error) {
      console.log(error)
      text = returnStr
    }
    return text
  }

}

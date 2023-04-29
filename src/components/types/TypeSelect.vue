<template>
    <div class="typeSelect">
        <select
            name="typeList"
            id="typeList"
            :class="typeSelectClass"
            :value="typeSelected"
            @change="e => updateSelected(e.target.value)"
        >
            <option value=""> - Select a type - </option>
            <option v-for="(type, index) in allTypeNames" :key="index" :value="type.toLowerCase()">{{ type }}</option>
        </select>
        <div class="clear" v-if="typeSelected != ''" v-on:click="updateSelected('')">
            <Button size="medium" color="ps-red">Clear</Button>
        </div>
    </div>
</template>

<script>
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import Button from '@/components/Button'

const pokeApi = RepositoryFactory.get('pokeApi')
const util = RepositoryFactory.get('util')

export default {
  name: 'TypeSelect',
  components: {
    Button
  },
  props: {
    mainType: String,
    count: Number
  },
  created () {
    if (this.count > 2 || this.count < 1) {
      throw new RangeError('Parameter count must be 1 or 2')
    }

    this.typeSelected = ''
    this.fetch()
  },
  data () {
    return {
      allTypeNames: [],
      typeSelected: ''
    }
  },
  methods: {
    async fetch () {
      var { data } = await pokeApi.getAllTypes() // eslint-disable-line
      data.results.filter((item) => { // filtering out unknown and shadow types
        if (item.name !== 'unknown' && item.name !== 'shadow' && item.name !== this.mainType) return item
      }).forEach(type => {
        this.allTypeNames.push(this.toUpper(type.name))
      })

    //   console.log(this.allTypeNames)
    },

    toUpper (value) {
      return util.toUpper(value)
    },

    updateSelected (type) {
      this.typeSelected = type
      this.$emit('change', type)
    }
  },
  computed: {
    typeSelectClass () {
      return this.mainType != null && this.typeSelected === ''
        ? 'type-border-' + this.mainType + ' type-color-' + this.mainType
        : 'type-border-' + this.typeSelected + ' type-color-' + this.typeSelected
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../styling/types.scss';

.typeSelect {
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  select {
    cursor: pointer;
    -webkit-appearance: none;
    padding: 0.2rem 1rem;
    min-width: 5.625rem;
    height: 2.75rem;
    text-align: center;
    border-radius: 0.625rem;
    font-size: inherit;
    background-color: white;
    font: inherit;
    margin-right: 1rem;
  }
}

@media screen and (min-width: 27rem) {
  .typeSelect {
    margin-top: 0;
    select {
      margin: 0 1rem;
    }
  }
}

</style>

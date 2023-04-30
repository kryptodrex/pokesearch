<template>
    <div class="typeSelect">
        <div class="typeDropdowns">
            <select
                name="typeList"
                id="typeList"
                :class="typeSelectClass_1"
                :value="typeSelected_1"
                @change="e => updateSelected(e.target.value, 1)"
            >
                <option value=""> - Select a type - </option>
                <option v-for="(type, index) in allTypeNames" :key="index" :value="type.toLowerCase()">{{ type }}</option>
            </select>
            <select
                name="typeList"
                id="typeList"
                :class="typeSelectClass_2"
                :value="typeSelected_2"
                @change="e => updateSelected(e.target.value, 2)"
                v-if="count == 2"
            >
                <option value=""> - Select a type - </option>
                <option v-for="(type, index) in allTypeNames" :key="index" :value="type.toLowerCase()">{{ type }}</option>
            </select>
        </div>
        <div class="clear" v-if="typeSelected_1 != '' || typeSelected_2 != ''" v-on:click="updateSelected('')">
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

    this.typeSelected_1 = ''
    this.typeSelected_2 = ''
    this.fetch()
  },
  data () {
    return {
      allTypeNames: [],
      typeSelected_1: '',
      typeSelected_2: ''
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

    updateSelected (type, num) {
      if (type !== '') {
        switch (num) {
          case 1:
            this.typeSelected_1 = type
            break
          case 2:
            this.typeSelected_2 = type
            break
        }
      } else {
        this.typeSelected_1 = ''
        this.typeSelected_2 = ''
      }
      this.$emit('change', { name: type, num: num })
    }
  },
  computed: {
    typeSelectClass_1 () {
      return this.mainType != null && this.typeSelected_1 === ''
        ? 'type-border-' + this.mainType + ' type-color-' + this.mainType
        : 'type-border-' + this.typeSelected_1 + ' type-color-' + this.typeSelected_1
    },
    typeSelectClass_2 () {
      return this.mainType != null && this.typeSelected_2 === ''
        ? 'type-border-' + this.mainType + ' type-color-' + this.mainType
        : 'type-border-' + this.typeSelected_2 + ' type-color-' + this.typeSelected_2
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../styling/types.scss';

.typeSelect {
  display: flex;
//   flex-direction: column;
  align-items: center;
//   margin: 1rem;
  width: 100%;
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
    // margin-right: 1rem;
    margin: 0.5rem;
  }
}

@media screen and (min-width: 27rem) {
  .typeSelect {
    margin-top: 0;
    // flex-direction: row;
    width: 50%;
    width: auto;
    select {
    //   margin: 0 1rem;
    }
  }
}

</style>

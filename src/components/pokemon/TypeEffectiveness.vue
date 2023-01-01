<template>
  <div>
    <Loader v-if="isLoading" class="loaderBall" type="ball" size="medium" />
    <div v-if="!isLoading" class="typeEffectiveness">
        <div class="dmg-box" v-for="(type, index) in types" :key="index">
            <span :class="'type-' + type.name "> {{ getAbbrType(type.name) }} </span>
            <span :class="'dmg-num dmg-' + getDamageAmount(type.name)"> {{ getDamageAmount(type.name) }} </span>
        </div>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import Loader from '@/components/Loader.vue'

const pokeApi = RepositoryFactory.get('pokeApi')

const damageMap = {
  double_damage_from: 2,
  half_damage_from: 0.5,
  no_damage_from: 0
}

const DamageRepo = {
  get: dmg => damageMap[dmg]
}

export default {
  name: 'TypeEffectiveness',
  components: {
    Loader
  },
  props: {
    typing: Array // 'typing' is passed in as an Array to the component
  },
  data () {
    return {
      isLoading: false,
      types: [],
      typingData: [],
      doubleDmgList: [],
      halfDmgList: [],
      noDmgList: [],
      damageRelations: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.isLoading = true

      var { data } = await pokeApi.getAllTypes() // eslint-disable-line
      this.types = data.results // eslint-disable-line

      this.types = this.types.filter((item) => {
        if (item.name !== 'unknown' && item.name !== 'shadow') return item
      })

      var { data } = await pokeApi.getType(this.typing[0].type.name) // eslint-disable-line
      this.typingData.push(data.damage_relations) // eslint-disable-line

      if (this.typing.length > 1) {
        var { data } = await pokeApi.getType(this.typing[1].type.name) // eslint-disable-line
        this.typingData.push(data.damage_relations) // eslint-disable-line
      }

      this.storeDamageRelations()

      this.isLoading = false
    },

    getAbbrType (name) {
      return name.substring(0, 3).toUpperCase()
    },

    storeDamageRelations () {
      this.typingData.forEach(data => {
        data.double_damage_from.forEach(type => {
          this.damageRelations = this.damageRelations.concat({
            name: type.name,
            damage: DamageRepo.get('double_damage_from')
          })
        })

        data.half_damage_from.forEach(type => {
          this.damageRelations = this.damageRelations.concat({
            name: type.name,
            damage: DamageRepo.get('half_damage_from')
          })
        })

        data.no_damage_from.forEach(type => {
          this.damageRelations = this.damageRelations.concat({
            name: type.name,
            damage: DamageRepo.get('no_damage_from')
          })
        })
      })
    },

    getDamageAmount (type) {
      var damageAmt = 1

      this.damageRelations.forEach(data => {
        if (data.name === type) {
          damageAmt *= data.damage
        }
      })

      if (damageAmt === 0.5) {
        return '½'
      } else if (damageAmt === 0.25) {
        return '¼'
      } else {
        return damageAmt.toString()
      }
    }

  }
}
</script>

<style scoped lang="css">

@import '../../styling/types.css';

.typeEffectiveness {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-row-gap: 0.5rem;

    margin-bottom: 1.25rem;
}

.loaderBall {
  margin: 1rem;
}

/* Damage Relations Data */
.dmg-box {
  display: flex;
  flex-direction: column;

  text-align: center;

  padding: 0 0.25rem;
}

[class*="type-"] {
  min-width: 2.7rem;
  border-radius: 0.625rem 0.625rem 0 0;
  padding: 0.2rem 0;
  margin-bottom: 0.12rem;
}

.dmg-num {
  border-radius: 0 0 0.625rem 0.625rem;
  padding: 0.2rem 0;
}

.dmg-0 {
  background-color: #2e3436;
  color: #ffdd57;
}
.dmg-¼ {
  background-color: #7c0000;
  color: #ffdd57;
}
.dmg-½ {
  background-color: #a40000;
  color: #ffdd57;
}
.dmg-1 {
  background-color: white;
  color: white;
}
.dmg-2 {
  background-color: #4e9a06;
  color: #ffdd57;
}
.dmg-4 {
  background-color: #73d216;
  color: #ffdd57;
}

/* Viewing on smaller phones, like iPhone SE */
@media screen and (max-width: 22.25rem) {
    .typeEffectiveness {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        grid-row-gap: 0.5rem;

        margin-bottom: 1.25rem;
    }
}

/* Viewing on large devices, like tablets and desktop */
@media screen and (min-width: 25.9375rem) {
    .typeEffectiveness {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-row-gap: 0.5rem;

        margin-bottom: 1.25rem;
    }
}

</style>

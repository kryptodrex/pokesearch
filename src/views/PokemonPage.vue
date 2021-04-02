<template>
  <div class="pokepage">
    <Loader v-if="isLoading" />

    <div id="pokemon-data" v-if="!isLoading">

        <div class="poke-head">
            <h1 class="pokedex-num"> #{{ findIndex(speciesInfo.id) }} </h1>

            <img :src="getPhotoUrl()" alt="" class="pokemon-image" id="poke-img">

            <!-- Grab the base name of the Pokémon -->
            <h1 class="pokemon-name" id="pokemon-name"> {{ toUpper(speciesInfo.name) }} </h1>
            
            <!-- Grab the type(s) of the Pokémon -->
            <div class="pokemon-types">
              <div :class="'typing-' + typeInfo.type.name" v-for="typeInfo in pokeInfo.types" v-bind:key="typeInfo.slot">
                {{ toUpper(typeInfo.type.name) }}
              </div>
            </div>

            <div class="pokemon-desc">
                <p> A {{ getTyping(pokeInfo.types) }} type Pokémon introduced in {{ getGeneration(speciesInfo.generation.name) }}. {{ getFlavorText(speciesInfo.flavor_text_entries) }}</p>
            </div>
        </div>

            <div class="pokemon-basic-info" v-bind:class="'poke-info-' + speciesInfo.color.name">

                <h3>Pokédex Data</h3>

                <p style="margin-bottom: 0"><strong>Abilities:</strong></p>

                <details v-for="abilityInfo in pokeInfo.abilities" :key="abilityInfo.slot">
                    <summary :id="'ab-' + abilityInfo.ability.name" class="poke-abilities poke-ab-<?php echo $poke_color?>" > {{ getAbility(abilityInfo) }} </summary> 
                    <p :id="'ab-txt-' + abilityInfo.ability.name" :class="'poke-ab-txt-' + abilityInfo.ability.name"> ADD_ABILITY_DETAIL </p>
                </details>

                <p><strong>Species:</strong> {{ getSpecies(speciesInfo.genera) }} </p>

                <p><strong>Color:</strong> <span :class="'poke-color-' + speciesInfo.color.name"> {{ toUpper(speciesInfo.color.name) }} </span></p>

                <p><strong>Shape:</strong> {{ toUpper(speciesInfo.shape.name) }} </p>

                <p>
                  <strong>Height:</strong> {{ getHeight(pokeInfo.height) }} <br>
                  <strong>Weight:</strong> {{ getWeight(pokeInfo.weight) }}
                </p>

                <p>
                  <strong>Japanese Name:</strong> {{ getJapaneseName(speciesInfo.names) }}
                </p>

                <p><strong>Type Defenses:</strong> Effectiveness of each type on {{ toUpper(speciesInfo.name) }}</p>
                <div class="dmg-relations">
                  <p>COMING SOON</p>
                    <!-- <?php foreach($type_effectiveness as $types) : ?>
                        <div class="dmg-box">
                            <span class="dmg-type-<?php echo $types[2] ?>"><?php echo $types[0]?></span>
                            <span class="dmg-num dmg-<?php echo $types[1] ?>"><?php echo $types[1]?></span>
                        </div>
                    <?php endforeach ?> -->
                </div>
                
            </div>
            
            <!-- Pokemon Training Info Box -->
            <div class="pokemon-training" v-bind:class="'poke-info-' + speciesInfo.color.name">
                <h3>Training</h3>
                <div class="poke-training-box">
                    <div class="poke-evs-all">
                        <h4>EV Yield</h4>
                        <div class="poke-evs-3">
                            <div class="poke-evs poke-ev-hp"> <span>{{ getStats('hp', 'effort', pokeInfo.stats) }}</span> <span><strong>HP</strong></span></div>
                            <div class="poke-evs poke-ev-atk"> <span>{{ getStats('attack', 'effort', pokeInfo.stats) }}</span> <span><strong>Atk</strong></span></div>
                            <div class="poke-evs poke-ev-def"> <span>{{ getStats('defense', 'effort', pokeInfo.stats) }}</span> <span><strong>Def</strong></span></div>
                        </div>
                        <div class="poke-evs-3">
                            <div class="poke-evs poke-ev-spatk"> <span>{{ getStats('special-attack', 'effort', pokeInfo.stats) }}</span> <span><strong>Sp.Atk</strong></span></div>
                            <div class="poke-evs poke-ev-spdef"> <span>{{ getStats('special-defense', 'effort', pokeInfo.stats) }}</span> <span><strong>Sp.Def</strong></span></div>
                            <div class="poke-evs poke-ev-speed"> <span>{{ getStats('speed', 'effort', pokeInfo.stats) }}</span> <span><strong>Speed</strong></span></div>
                        </div>
                    </div>
                    
                    <div class="poke-training">
                        <table class="poke-train-table">
                            <tbody>
                                <tr>
                                    <td class="poke-train-c1"><strong>Base EXP:</strong></td> <td class="poke-train-c2">{{ pokeInfo.base_experience }}</td>
                                </tr>
                                <tr>
                                    <td class="poke-train-c1"><strong>Base Happiness:</strong></td> <td class="poke-train-c2">{{ speciesInfo.base_happiness }}</td>
                                </tr>
                                <tr>
                                    <td class="poke-train-c1"><strong>Capture Rate:</strong></td> <td class="poke-train-c2">{{ speciesInfo.capture_rate }}</td>
                                </tr>
                                <tr>
                                    <td class="poke-train-c1"><strong>Growth Rate:</strong></td> <td class="poke-train-c2">{{ toUpper(speciesInfo.growth_rate.name) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Pokemon Stats Info Box -->
            <div class="pokemon-stats" v-bind:class="'poke-info-' + speciesInfo.color.name">
                <h3>Base Stats</h3>
                <table class="base-stats">
                    <tbody>
                        <tr class="base-stats-r1">
                            <td class="base-stats-c1 base-stat-hp"><strong>HP:</strong></td> <td class="base-stats-c2">{{ getStats('hp', 'base_stat', pokeInfo.stats) }}</td>
                            <td class="base-stats-c3 base-stat-spatk"><strong>Special Attack:</strong></td> <td class="base-stats-c4">{{ getStats('special-attack', 'base_stat', pokeInfo.stats) }}</td>
                        </tr>
                        <tr class="base-stats-r2">
                            <td class="base-stats-c1 base-stat-atk"><strong>Attack:</strong></td> <td class="base-stats-c2">{{ getStats('attack', 'base_stat', pokeInfo.stats) }}</td>
                            <td class="base-stats-c3 base-stat-spdef"><strong>Special Defense:</strong></td> <td class="base-stats-c4">{{ getStats('special-defense', 'base_stat', pokeInfo.stats) }}</td>
                        </tr>
                        <tr class="base-stats-r3">
                            <td class="base-stats-c1 base-stat-def"><strong>Defense:</strong></td> <td class="base-stats-c2">{{ getStats('defense', 'base_stat', pokeInfo.stats) }}</td>
                            <td class="base-stats-c3 base-stat-speed"><strong>Speed:</strong></td> <td class="base-stats-c4">{{ getStats('speed', 'base_stat', pokeInfo.stats) }}</td>
                        </tr>
                    </tbody>
                </table>

                <table class="base-stats-mobile">
                    <tbody>
                        <tr>
                            <td class="base-stats-m-c1 base-stat-hp"><strong>HP:</strong> </td>
                            <td class="base-stats-m-c2">{{ getStats('hp', 'base_stat', pokeInfo.stats) }}</td>
                        </tr>
                        <tr>
                            <td class="base-stats-m-c1 base-stat-atk"><strong>Attack:</strong> </td>
                            <td class="base-stats-m-c2">{{ getStats('attack', 'base_stat', pokeInfo.stats) }}</td>
                        </tr>
                        <tr>
                            <td class="base-stats-m-c1 base-stat-def"><strong>Defense:</strong> </td>
                            <td class="base-stats-m-c2">{{ getStats('defense', 'base_stat', pokeInfo.stats) }}</td>
                        </tr>
                        <tr>
                            <td class="base-stats-m-c1 base-stat-spatk"><strong>Special Attack:</strong> </td>
                            <td class="base-stats-m-c2">{{ getStats('special-attack', 'base_stat', pokeInfo.stats) }}</td>
                        </tr>
                        <tr>
                            <td class="base-stats-m-c1 base-stat-spdef"><strong>Special Defense:</strong> </td>
                            <td class="base-stats-m-c2">{{ getStats('special-defense', 'base_stat', pokeInfo.stats) }}</td>
                        </tr>
                        <tr>
                            <td class="base-stats-m-c1 base-stat-speed"><strong>Speed:</strong> </td>
                            <td class="base-stats-m-c2">{{ getStats('speed', 'base_stat', pokeInfo.stats) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pokemon Breeding Info Box -->
            <div class="pokemon-breeding" v-bind:class="'poke-info-' + speciesInfo.color.name">
                <h3>Breeding Info</h3>
                <p><strong>Gender Rate:</strong> {{ getGenderRate() }} </p>
                <p><strong>Egg-Group(s):</strong> {{ getEggGroups() }} </p>
                <p><strong>Hatching:</strong> {{ calcHatching(speciesInfo.hatch_counter) }}</p>
            </div>

            <!-- Pokemon Dex Entries Info Box -->
            <!-- <div class="pokemon-generation-dex-entries" v-bind:class="'poke-info' + speciesInfo.color.name">
                COMING SOON
            </div> -->

</div>

  </div>
</template>

<script>
  import router from '@/router';
  import { RepositoryFactory } from '@/repositories/repositoryFactory';
  import Loader from '@/components/Loader';
  
  const pokeApi = RepositoryFactory.get('pokeApi');
  const util = RepositoryFactory.get('util');

  export default {

    name: 'PokePage',
    components: {
      Loader
    },
    data() {
      return {
        isLoading: false,
        speciesInfo: null,
        pokeInfo: null,
        abilityInfo: []
      };
    },
    created () {
      this.fetch()
    },
    methods: {
      async fetch () {
        const pokemon = router.currentRoute.params.name;

        this.isLoading = true;

        var { data } = await pokeApi.getPokemonSpecies(pokemon);
        this.speciesInfo = data;
        
        var { data } = await pokeApi.getPokemon(pokemon);
        this.pokeInfo = data;

        console.log(util.getBrowserLocales());
        
        this.isLoading = false;
      },

      toUpper(value) {
        return value[0].toUpperCase() + value.slice(1);
      },

      formatText(text) {
        return text.replace('/\s+/', ' ').trim();
      },

      getPhotoUrl() {
        return util.getPokemonImageUrl(this.findIndex(this.speciesInfo.id))
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

      getTyping(types) {
        if (types.length > 1) {
          return this.toUpper(types[0].type.name) + ' & ' + this.toUpper(types[1].type.name);
        } else {
          return this.toUpper(types[0].type.name)
        }
      },

      getGeneration(gen) {
        var split = gen.split("-");
        return this.toUpper(split[0]) + ' ' + split[1].toUpperCase();
        // var { data } = await pokeApi.getGeneration(gen);
        // this.generation = data.names[0].name;
      },

      getFlavorText(data) {
        for (var i = 0; i < data.length; i++) {
          var entry = data[i];
          if (entry.language.name == 'en') {
            return this.formatText(entry.flavor_text);
          }
        }
      },

      getAbility(data) {
        var ability = this.toUpper(data.ability.name)
        if (data.is_hidden) {
          return ability + ' (hidden)'
        } else {
          return ability
        }
      },

      getSpecies(data) {
        for (var i = 0; i < data.length; i++) {
          var entry = data[i];
          if (entry.language.name == 'en') {
            return entry.genus;
          }
        }
      },

      getWeight(data) {
        var weight_metric = data / 10;
        var weight_us = Math.round(weight_metric * 2.20462262185);
        return weight_metric + ' kg  |  ' + weight_us + ' lbs';
      },

      getHeight(data) {
        var height_metric = data / 10;

        var inches = height_metric * 39.37007874;
        var feet = Math.floor(inches / 12);

        var inches_r = Math.round(inches % 12);

        return height_metric + ' m  |  ' + feet + " ft " + inches_r + ' in';
      },

      getJapaneseName(data) {
        var japaneseName = '';
        for (var i = 0; i < data.length; i++) {
          var entry = data[i];
          if (entry.language.name == 'ja') {
            japaneseName += entry.name;
          }
        }
        for (var i = 0; i < data.length; i++) {
          var entry = data[i];
          if (entry.language.name == 'roomaji') {
            japaneseName += ' (' + entry.name + ')';
          }
        }

        return japaneseName
      },

      getStats(name, type, stats) {
        for (var i = 0; i < stats.length; i++) {
          switch (type) {
            case 'base_stat':
              if (stats[i].stat.name == name) {
                return stats[i].base_stat;
              }
              break;

            case 'effort': 
              if (stats[i].stat.name == name) {
                return stats[i].effort;
              }
              break;
          }
        }
      },

      getGenderRate() {
        return 'COMING SOON';
      },

      calcHatching(data) {
        var egg_walk_amt = data * 256;
        return data + ' egg cycles (' + egg_walk_amt + ' steps)';
      },

      getEggGroups() {
        return 'COMING SOON';
      }
    },
    computed: {
      computedPosts () {
        return this.posts.slice(0, 10)
      }
    }

  }
</script>

<style>

.pokemon-image {
    margin-top: 1rem;
    height: 10rem;
}

/* .pokemon-name {
    font-family: 'quicksandmedium', Arial, Helvetica, sans-serif;
    margin: 0.5rem 0;
} */

/* Type styling */
    .pokemon-types {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    [class*="typing-"] {
        border: 2px solid #68a090;
        border-radius: 0.625rem;

        padding: 0.2rem 1rem;
        margin: 0 0.5rem;
        min-width: 5.625rem;
        text-align: center;

        cursor: pointer;
    }
    /* [class*="typing-"]:hover {
        box-shadow: 0 3px 3px 0 rgba(0,0,0,0.20);
        transition: 0.3s;
    } */
    .typing-normal { border: 2px solid #a8a878; color: #6d6d4e; }
    .typing-fire { border: 2px solid #f08030; color: #9c531f; }
    .typing-fighting { border: 2px solid #c03028; color: #7d1f1a; }
    .typing-water { border: 2px solid #6890f0; color: #445e9c; }
    .typing-flying { border: 2px solid #a890f0; color: #6d5e9c; }
    .typing-grass { border: 2px solid #78c850; color: #4e8234; }
    .typing-poison { border: 2px solid #a040a0; color: #682a68; }
    .typing-electric { border: 2px solid #f8d030; color: #a1871f; }
    .typing-ground { border: 2px solid #e0c068; color: #927d44; }
    .typing-psychic { border: 2px solid #f85888; color: #a13959; }
    .typing-rock { border: 2px solid #b8a038; color: #786824; }
    .typing-ice { border: 2px solid #98d8d8; color: #638d8d; }
    .typing-bug { border: 2px solid #a8b820; color: #6d7815; }
    .typing-dragon { border: 2px solid #7038f8; color: #4924a1; }
    .typing-ghost { border: 2px solid #705898; color: #493963; }
    .typing-dark { border: 2px solid #705848; color: #49392f; }
    .typing-steel { border: 2px solid #b8b8d0; color: #787887; }
    .typing-fairy { border: 2px solid #ee99ac; color: #9b6470; }

/* Info styling */

    /* Info boxes */
        .pokemon-desc {
            text-align: left;
            margin: 0 1rem;
        }

        [class*="poke-info-"] {
            border: 2px solid #4A4A4A;
            border-radius: 0.625rem;
            padding: 0 1rem;
            margin: 1rem 0;
            text-align: left;
        }
        .poke-info-black { border: 2px solid #323232;}
        .poke-info-blue { border: 2px solid #3482DE;}
        .poke-info-brown { border: 2px solid #AF891F;}
        .poke-info-gray { border: 2px solid #707070;}
        .poke-info-green { border: 2px solid #64A743;}
        .poke-info-pink { border: 2px solid #E97698;}
        .poke-info-purple { border: 2px solid #7C63B8;}
        .poke-info-red { border: 2px solid #EF4036;}
        .poke-info-white { border: 2px solid #E3E3E3;}
        .poke-info-yellow { border: 2px solid #F8D030;}

        .poke-color-black { color: #323232;}
        .poke-color-blue { color: #3482DE;}
        .poke-color-brown { color: #AF891F;}
        .poke-color-gray { color: #707070;}
        .poke-color-green { color: #64A743;}
        .poke-color-pink { color: #E97698;}
        .poke-color-purple { color: #7C63B8;}
        .poke-color-red { color: #EF4036;}
        .poke-color-white { color: #aaaaaa;}
        .poke-color-yellow { color: #F8D030;}

    /* Pokedex Data */
        .poke-abilities {
            cursor: pointer;
        }

        /* Damage Relations Data */

        .dmg-box {
            display: flex;
            flex-direction: column;

            text-align: center;

            padding: 0 0.25rem;
        }

        [class*="dmg-type-"] {
            min-width: 2.7rem;
            border-radius: 0.625rem 0.625rem 0 0;
            padding: 0.2rem 0;
            margin-bottom: 0.12rem;
        }

        .dmg-num {
            border-radius: 0 0 0.625rem 0.625rem;
            padding: 0.2rem 0;
        }

        .dmg-type-normal { border: 2px solid #a8a878; color: #6d6d4e; }
        .dmg-type-fire { border: 2px solid #f08030; color: #9c531f; }
        .dmg-type-fighting { border: 2px solid #c03028; color: #7d1f1a; }
        .dmg-type-water { border: 2px solid #6890f0; color: #445e9c; }
        .dmg-type-flying { border: 2px solid #a890f0; color: #6d5e9c; }
        .dmg-type-grass { border: 2px solid #78c850; color: #4e8234; }
        .dmg-type-poison { border: 2px solid #a040a0; color: #682a68; }
        .dmg-type-electric { border: 2px solid #f8d030; color: #a1871f; }
        .dmg-type-ground { border: 2px solid #e0c068; color: #927d44; }
        .dmg-type-psychic { border: 2px solid #f85888; color: #a13959; }
        .dmg-type-rock { border: 2px solid #b8a038; color: #786824; }
        .dmg-type-ice { border: 2px solid #98d8d8; color: #638d8d; }
        .dmg-type-bug { border: 2px solid #a8b820; color: #6d7815; }
        .dmg-type-dragon { border: 2px solid #7038f8; color: #4924a1; }
        .dmg-type-ghost { border: 2px solid #705898; color: #493963; }
        .dmg-type-dark { border: 2px solid #705848; color: #49392f; }
        .dmg-type-steel { border: 2px solid #b8b8d0; color: #787887; }
        .dmg-type-fairy	{ border: 2px solid #ee99ac; color: #9b6470; }

        .dmg-0 { background-color: #2e3436; color: #ffdd57; }
        .dmg-¼ { background-color: #7c0000; color: #ffdd57; }
        .dmg-½ { background-color: #a40000; color: #ffdd57; }
        .dmg-1 { background-color: white; color: white}
        .dmg-2 { background-color: #4e9a06; color: #ffdd57; }
        .dmg-4 { background-color:#73d216; color: #ffdd57; }


    /* Training info */

        .poke-training-box {
            display: flex;
            flex-direction: column;
        }

        .poke-evs-all {
            display: flex;
            flex-direction: column;
        }
        .poke-evs-all>h4 {
            margin: 0;
            margin-bottom: 0.5rem;
        }

        .poke-evs-3 {
            display: flex;
            flex-direction: row;
            justify-content: center;

            margin: 0 1rem 1rem;
        }

        .poke-evs {
            display: flex;
            flex-direction: column;

            align-items: center;
            justify-content: center;
        }

        [class*="poke-ev-"] {
            min-width: 4rem;

            border-radius: 0.625rem;

            padding: 0.2rem 0;
            margin: 0 0.5rem;

            text-align: center;
        }
        .poke-ev-hp { border: 2px solid #ff5959; background-color: rgba(255,89,89,0.3) }
        .poke-ev-atk { border: 2px solid #f5ac78; background-color: rgba(245,172,120,0.3) }
        .poke-ev-def { border: 2px solid #fae078; background-color: rgba(250,224,120,0.3) }
        .poke-ev-spatk { border: 2px solid #65aff7; background-color: rgba(101,175,247,0.3) }
        .poke-ev-spdef { border: 2px solid #7ddb7d; background-color: rgba(125,219,125,0.3) }
        .poke-ev-speed { border: 2px solid #f755c1; background-color: rgba(247,85,193,0.3) }

        .poke-train-table {
            border-collapse: separate;
            border-spacing: 0 1rem;
        }
        .poke-train-c1 {
            text-align: right;
        }
        .poke-train-c2 {
            padding-left: 1rem;
        }

    /* Base Stats info */
        .pokemon-stats>h3 {
            margin-bottom: 0;
        }

        .base-stats {
            display: none;
            margin-bottom: 1rem;
            border-spacing: 1rem;
        }
        .base-stats-c1, .base-stats-c3 {
            text-align: right;
        }
        .base-stats-c2, .base-stats-c4 {
            /* padding-left: 1rem; */
        }

        .base-stats-mobile {
            margin-bottom: 1rem;
            border-collapse: separate;
            border-spacing: 0 1rem;
        }
        .base-stats-m-c1 {
            text-align: right;
        }
        .base-stats-m-c2 {
            padding-left: 1rem;
        }

        .base-stat-hp { color:#ff5959 }
        .base-stat-atk { color:#f5ac78 }
        .base-stat-def { color:#e7cf6d }
        .base-stat-spatk { color:#65aff7 }
        .base-stat-spdef { color:#7ddb7d }
        .base-stat-speed { color:#f755c1 }

@media screen and (min-width: 25.9375rem) {
  .pokemon-data {
    margin: 0 auto;
    padding: 0;
    max-width: 46.875rem;
    display: flex;
    flex-direction: column;
  }

  .poke-training-box {
    flex-direction: row;
  }
}
  
</style>
<template>
    <div class="forward-back">
        <!-- <div class="placeholder" v-if="isLoading" /> -->
        <div class="back-div">
            <router-link aria-label="Navigate back in dex" :to="'/pokemon/' + prevNum">
                <img class="arrow" id="back-arrow" src="@/assets/images/back.svg" alt="" v-on:click="navigatingTo(prevNum)">
            </router-link>
            <div class="placeholder prev" v-if="isLoading">
                <Loader type="ball" size="small" />
            </div>
            <img class="pokesprite prev" :src="prevPokeData.spriteUrl" :alt="'Sprite of ' + prevPokeData.name" v-if="!isLoading">
            <div class="pokenumname" v-if="!isLoading">
                <div class="pokenum prev"> #{{ prevPokeData.dexNum }} </div>
                <div class="pokename prev"> {{ prevPokeData.name }} </div>
            </div>
        </div>

        <div class="forward-div">
            <div class="spacer"></div>
            <div class="pokenumname" v-if="!isLoading">
                <div class="pokenum next"> #{{ nextPokeData.dexNum }} </div>
                <div class="pokename next"> {{ nextPokeData.name }} </div>
            </div>
            <img class="pokesprite next" :src="nextPokeData.spriteUrl" :alt="'Sprite of ' + nextPokeData.name" v-if="!isLoading">
            <div class="placeholder next" v-if="isLoading">
                <Loader type="ball" size="small" />
            </div>
            <router-link aria-label="Navigate forward in dex" :to="'/pokemon/' + nextNum">
                <img class="arrow" id="forward-arrow" src="@/assets/images/forward.svg" alt="" v-on:click="navigatingTo(nextNum)">
            </router-link>
        </div>
    </div>
</template>

<script>

import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repositories/repositoryFactory';

const pokeApi = RepositoryFactory.get('pokeApi');
const util = RepositoryFactory.get('util');

export default {
    name: 'DexNavigation',
    components: {
        Loader
    },
    props: {
        prevNum: null,
        nextNum: null
    },
    data() {
        return {
            isLoading: false,
            nextPokeData: null,
            prevPokeData: null
        }
    },
    created() {
        this.fetch();
    },
    methods: {
        async fetch() {
            this.isLoading = true;

            var { data } = await pokeApi.getPokemon(this.prevNum);
            this.prevPokeData = {
                name: util.toUpper(data.species.name),
                dexNum: this.findIndex(this.prevNum),
                spriteUrl: data.sprites.front_default
            }

            var { data } = await pokeApi.getPokemon(this.nextNum);
            this.nextPokeData = {
                name: util.toUpper(data.species.name),
                dexNum: this.findIndex(this.nextNum),
                spriteUrl: data.sprites.front_default
            }

            this.isLoading = false;
        },

        findIndex(value) {
            return util.findIndex(value);
        },

        navigatingTo(value) {
            this.$emit('navigate', value);
        }
    }
}
</script>

<style scoped lang="css">

/* Next/Prev in Pokédex */
.forward-back {
    margin: 0 0.7rem;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 'prev next';
}

.back-div, .forward-div {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.back-div {
    grid-area: prev;
}

.spacer {
    flex-grow: 1;
}
.forward-div {
    grid-area: next;
    text-align: right;
}

.pokenumname {
    display: flex;
    flex-direction: column;
}
.prev {
    text-align: left;
    margin-left: 0.5rem;
}

/* .prev-num, .prev-name, .prev-sprite {
    margin-left: 0.5rem;
} */

.pokesprite {
    height: 2rem;
}

.next {
    text-align: right;
    margin-right: 0.5rem;
}
/* .next-num, .next-name, .next-sprite {
    margin-right: 0.5rem;
} */

.arrow {
    height: 1.875rem;
    cursor: pointer;
}

.pokedex-num {
    margin-bottom: 0;
}

/* Images */
.pokemon-sprite {
    margin-top: 1rem;
}

.placeholder {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 3rem;
}


/* Viewing on smaller phones, like iPhone SE */
@media screen and (max-width: 22.25rem) {
    .prev-sprite, .pokesprite {
        display: none;
    }
}

/* Styling for desktop/tablet viewing */
@media screen and (min-width: 25.9375rem) {
    .pokenumname {
        flex-direction: row;
    }

    .placeholder {
        height: 2rem;
    }
}

</style>

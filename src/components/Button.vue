<template>
    <div tabindex="0" class="button" :class="colorClass + ' ' + sizeClass">
      <slot></slot>
    </div>
</template>

<script>

export default {
  name: 'Button',
  props: {
    size: String,
    color: String,
    inverted: Boolean
  },
  computed: {
    colorClass () {
      if (this.color) {
        if (this.inverted) {
          return 'bgInv-' + this.color
        } else return 'bg-' + this.color
      } else return ''
    },
    sizeClass () {
      if (this.size) return this.size
      else return ''
    }
  }
}

</script>

<style scoped lang="scss">

@import '../styling/colors';

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: $radius-md;
  width: fit-content;
  cursor: pointer;
  transition: $transition-fast;
}

.large {
  border-radius: $radius-sm + 2px;
  font-size: 1.2rem;
  padding: 0.8rem $space-lg;
}
.medium {
  border-radius: $radius-sm;
  font-size: 1rem;
  padding: $space-sm 0.8rem;
}

// PokéSearch brand button variants (separate from Pokémon species colors)
.bg-ps-white {
  background-color: $color-primary-light;
  border-color: $color-primary-light;
  color: $color-primary;
}
.bg-ps-white:hover,
.bg-ps-white:focus {
  border-color: $color-primary-light;
  background-color: $color-text-secondary;
  color: $color-primary-light;
}

.bg-ps-red {
  background-color: $color-primary;
  border-color: $color-primary;
  color: $color-primary-light;
}
.bg-ps-red:hover,
.bg-ps-red:focus {
  background-color: $color-primary-light;
  border-color: $color-primary;
  color: $color-primary;
}

.bgInv-ps-red {
  background-color: $color-primary-light;
  border-color: $color-primary;
  color: $color-primary;
}

.button:hover,
.button:focus {
  transition: $transition-fast;
}

@media screen and (min-width: $bp-md) {
  .button {
    // reserved for future desktop overrides
  }
}

</style>

<template>
    <!-- <div tabindex="0" class="button" :class="getFormatting()"> -->
    <div tabindex="0" class="button" :class="colorClass + ' ' + sizeClass">
      <slot></slot>
    </div>
</template>

<script>

export default {
  name: 'PokeBox',
  props: {
    size: String,
    color: String,
    inverted: Boolean
  },
  methods: {
    getFormatting () {
      if (this.size !== null && this.color !== null) {
        return this.size + ' ' + this.color
      } else if (this.size == null && this.color !== null) {
        return this.color
      } else if (this.size !== null && this.color == null) {
        return this.size
      }
    }
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

<style scoped lang="css">

@import '../styling/colors.css';

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  /* border: 2px solid; */
  border-radius: 0.625rem;
  /* margin: 0 1rem; */
  width: fit-content;
  cursor: pointer;
  transition: 0.2s;
}

.large{
  border-radius: 0.5rem;
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
}
.medium {
  border-radius: 0.4rem;
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
}

.bg-ps-white {
    background-color: #f1f1f1;
    border-color: #f1f1f1;
    color: rgb(201, 38, 63);
}

.bg-ps-red {
    background-color: rgb(201, 38, 63);
    border-color: rgb(201, 38, 63);
    color: #f1f1f1;
}
.bgInv-ps-red {
    background-color: #f1f1f1;
    border-color: rgb(201, 38, 63);
    color: rgb(201, 38, 63);
}

.button:hover, .button:focus {
    /* border: 2px solid; */
    transition: 0.2s;
}

.bg-ps-white:hover, .bg-ps-white:focus {
    border-color: #f1f1f1;
    background-color: #4A4A4A;
    color: #f1f1f1;
}

.bg-ps-red:hover, .bg-ps-red:focus {
    background-color: #f1f1f1;
    border-color: rgb(201, 38, 63);
    color: rgb(201, 38, 63);
}

/* .bg-ps-grey:hover, .bg-ps-grey:focus {
    background-color: rgb(201, 38, 63);
    border-color: rgb(201, 38, 63);
    color: #f1f1f1;
} */

/* Styling for desktop/tablet viewing */
@media screen and (min-width: 25.9375rem) {
  .button {
    /* margin: 0 1rem; */
  }
}

</style>

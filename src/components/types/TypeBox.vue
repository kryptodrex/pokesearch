<template>
    <div v-on:click="toggleSelect()">
        <router-link v-if="enableLink" :to="'/types/' + typeName">
            <div class="typeLink" :class="'type-color-' + typeName + ' ' + ' type-border-' + typeName + ' type-btn-' + typeName + ' ' + sizeClass + ' ' + selectedClass">
                <slot></slot>
            </div>
        </router-link>
        <div v-if="!enableLink">
            <div :class="'type-color-' + typeName + ' ' + ' type-border-' + typeName + ' ' + sizeClass + ' ' + clickableClass + ' ' + selectedClass">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TypeBox',
  props: {
    typeName: String,
    size: String,
    linkEnabled: Boolean,
    clickable: Boolean
  },
  data () {
    return {
      selected: false
    }
  },
  methods: {
    toggleSelect () {
      if (this.selected) this.selected = false
      else this.selected = true
    }
  },
  computed: {
    sizeClass () {
      if (this.size !== null) return this.size
      else return 'small'
    },
    enableLink () {
      if (this.linkEnabled !== null) return this.linkEnabled
      else return true
    },
    clickableClass () {
      if (this.clickable) return 'type-btn-' + this.typeName
      else return ''
    },
    selectedClass () {
      if (this.selected) return 'selected'
      else return ''
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../styling/types.scss';

[class*="type-"] {
  border-radius: 0.625rem;

  padding: 0.2rem 1rem;
  margin: 0 0.5rem;
  /* max-width: 25%; */
  min-width: 5.625rem;
  text-align: center;
}

.large{
  border-radius: 1rem;
  border-width: 4px !important;
  font-size: 1.5rem;
  padding: 1rem 1.8rem;
}
.medium {
  border-radius: 1rem;
  border-width: 3px !important;
  font-size: 1.3rem;
  padding: 0.5rem 0.8rem;
}
/* .small {
  font-size: 1rem;
} */

// .typeLink {
//     transition: 0.2s;
// }
// .typeLink:hover, .typeLink:focus {
//   box-shadow: 0 4px 4px 0 rgba(0,0,0,0.20);
//   transition: 0.3s;
// }

</style>

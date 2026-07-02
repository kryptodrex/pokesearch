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
@use '../../styling/types' as *;

[class*='type-'] {
  border-radius: $radius-md;
  padding: 0.2rem $space-md;
  margin: 0 $space-sm;
  min-width: 5.625rem;
  text-align: center;
}

.large {
  border-radius: $radius-lg;
  border-width: 4px !important;
  font-size: 1.5rem;
  padding: $space-md 1.8rem;
}
.medium {
  border-radius: $radius-lg;
  border-width: 3px !important;
  font-size: 1.3rem;
  padding: $space-sm 0.8rem;
}

</style>

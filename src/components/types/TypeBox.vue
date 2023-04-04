<template>
    <router-link :to="'/types/' + typeName">
        <div :class="'type-' + typeName + ' ' + sizeClass">
            <slot></slot>
        </div>
    </router-link>
</template>

<script>
export default {
  name: 'TypeBox',
  props: {
    typeName: String,
    size: String
  },
  computed: {
    sizeClass () {
      if (this.size !== null) return this.size
      else return 'small'
    }
  }
}
</script>

<style scoped lang="css">
@import '../../styling/types.css';

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
  border-width: 4px;
  font-size: 1.5rem;
  padding: 1rem 1.8rem;
}
.medium {
  border-radius: 1rem;
  border-width: 3px;
  font-size: 1.3rem;
  padding: 0.5rem 0.8rem;
}
/* .small {
  font-size: 1rem;
} */
</style>

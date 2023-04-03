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
  min-width: 5.625rem;
  text-align: center;
}
.clickable {
  cursor: pointer;
}
.not-clickable {
  cursor: text;
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
.small {
  /* font-size: 1rem; */
}
</style>

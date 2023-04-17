<template>
    <span ref="wrapper" :class="'type-color-' + name">
        <b><slot></slot></b>
    </span>
</template>

<script>
export default {
  name: 'TypeName',
  props: {
    name: String
  }
}
</script>

<style scoped lang="scss">
@import '../../styling/types.scss';
</style>

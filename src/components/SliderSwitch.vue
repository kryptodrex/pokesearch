<template>
    <label class="switch">
        <input type="checkbox" :checked="state" v-on:click="changeState()" :disabled="disabled" :hidden="hidden">
        <span class="slider round" :class="colorClass"></span>
    </label>
</template>

<script>

export default {
  name: 'SliderSwitch',
  props: {
    propState: Boolean,
    disabled: Boolean,
    hidden: Boolean,
    color: String
  },
  data () {
    return {
      state: false
    }
  },
  mounted () {
    this.state = this.propState
  },
  methods: {
    changeState () {
      this.state ? this.state = false : this.state = true
      this.$emit('toggle', this.state)
    }
  },
  computed: {
    colorClass () {
      if (this.color) {
        return 'slider-color-' + this.color
      } else return ''
    }
  }
}

</script>

<style scoped lang="scss">

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: $transition-slow;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: $transition-slow;
}

// Checked state colors — uses $pokemon-* variables from _variables.scss
input:checked + .slider-color-black  { background-color: $pokemon-black; }
input:checked + .slider-color-blue   { background-color: $pokemon-blue; }
input:checked + .slider-color-brown  { background-color: $pokemon-brown; }
input:checked + .slider-color-gray   { background-color: $pokemon-gray; }
input:checked + .slider-color-green  { background-color: $pokemon-green; }
input:checked + .slider-color-pink   { background-color: $pokemon-pink; }
input:checked + .slider-color-purple { background-color: $pokemon-purple; }
input:checked + .slider-color-red    { background-color: $pokemon-red; }
input:checked + .slider-color-white  { background-color: #aaaaaa; }
input:checked + .slider-color-yellow { background-color: $pokemon-yellow; }

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

input:disabled {
  background-color: #ccc;
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>

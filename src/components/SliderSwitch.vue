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
    },
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
        return 'slider-color-' + this.color
      } else return ''
    }
  }
}

</script>

<style scoped lang="css">

@import '../styling/colors.css';

 /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider-color-black {
  background-color: #323232;
}
input:checked + .slider-color-blue {
  background-color: #3482de;
}
input:checked + .slider-color-brown {
  background-color: #af891f;
}
input:checked + .slider-color-gray {
  background-color: #707070;
}
input:checked + .slider-color-green {
  background-color: #64a743;
}
input:checked + .slider-color-pink {
  background-color: #e97698;
}
input:checked + .slider-color-purple {
  background-color: #7c63b8;
}
input:checked + .slider-color-red {
  background-color: rgb(201, 38, 63);
}
input:checked + .slider-color-white {
  background-color: #aaaaaa;
}
input:checked + .slider-color-yellow {
  background-color: #f8d030;
}

/* input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
} */

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

input:disabled {
  background-color: #ccc
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>

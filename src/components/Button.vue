<template> 
    <div tabindex="0" class="button" :class="getFormatting()">
      <slot></slot>
    </div>
</template>

<script>

export default {
  name: 'PokeBox',
  props: {
    size: String,
    color: String
  },
  methods: {
    getFormatting() {
      if (this.size != null && this.color != null) {
        return this.size + ' ' + this.color;
      } else if (this.size == null && this.color != null) {
        return this.color;
      } else if (this.size != null && this.color == null) {
        return this.size;
      }
    }
  }
}

</script>


<style scoped lang="css">

.large{
  border-radius: 0.5rem;
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
}
.medium {
  border-radius: 0.4rem;
  font-size: 0.9rem;
  padding: 0.5rem 0.8rem;
}

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  border: 2px solid;
  border-radius: 0.625rem;
  /* margin: 0 1rem; */
  width: fit-content;
  cursor: pointer;
  transition: 0.2s;
}

.white {
    background-color: #f1f1f1;
    border-color: #f1f1f1;
    color: rgb(201, 38, 63);
}

.grey {
    background-color: #f1f1f1;
    border-color: rgb(201, 38, 63);
    color: rgb(201, 38, 63);
}

.red { 
    background-color: rgb(201, 38, 63);
    border-color: rgb(201, 38, 63);
    color: #f1f1f1;
}

.button:hover, .button:focus { 
    border: 2px solid;
    transition: 0.2s;
}

.white:hover, .white:focus {
    border-color: #f1f1f1;
    background-color: #4A4A4A;
    color: #f1f1f1;
}

.red:hover, .red:focus {
    background-color: #f1f1f1;
    border-color: rgb(201, 38, 63);
    color: rgb(201, 38, 63);
}

.grey:hover, .grey:focus {
    background-color: rgb(201, 38, 63);
    border-color: rgb(201, 38, 63);
    color: #f1f1f1;
}

/* Styling for desktop/tablet viewing */
@media screen and (min-width: 25.9375rem) {
  .button {
    /* margin: 0 1rem; */
  }
}
  
</style>
<template> 
    <div class="button" :class="getFormatting()">
      {{text}}
    </div>
</template>

<script>

export default {
  name: 'PokeBox',
  props: {
    size: String,
    color: String,
    text: String
  },
  methods: {
    // getSize() {
    //   var button = 'button';
    //   switch (this.size) {
    //     case 'large':
    //       return button + '-lg'
    //     case 'medium':
    //       return button + '-med'
    //   }
    // }

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


<style>

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
  border: 0.2rem solid;
  border-radius: 4px;
  /* margin: 0 1rem; */
  width: fit-content;
  cursor: pointer;
  transition: 0.2s;
}

.white { /* for poke_page only */
    background-color: #f1f1f1;
    border-color: #f1f1f1;
    color: rgb(201, 38, 63);
}

.red { /* for poke_page only */
    background-color: rgb(201, 38, 63);
    border-color: rgb(201, 38, 63);
    color: #f1f1f1;
}

.button:hover, .button:focus { /* for poke_page only */
    border: 0.2rem solid;
    transition: 0.2s;
}

.white:hover, .white:focus { /* for poke_page only */
    border-color: #f1f1f1;
    background-color: #4A4A4A;
    color: #f1f1f1;
}

.red:hover, .red:focus { /* for poke_page only */
    border-color: #f1f1f1;
    background-color: #4A4A4A;
    color: #f1f1f1;
}

/* Styling for desktop/tablet viewing */
@media screen and (min-width: 25.9375rem) {
  .button {
    margin: 0 1rem;
  }
}
  
</style>
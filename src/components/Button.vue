<template> 
    <div class="actionBtn">
      {{ text }}
    </div>
</template>

<script>

export default {
  name: 'PokeBox',
  props: {
    text: String
  }
}

</script>


<style>

.actionBtn { /* for poke_page only */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f1f1f1;
    border: 1px solid #f1f1f1;
    color: rgb(201, 38, 63);
    font-weight: bold;
    border-radius: 3px;
    padding: 0.5rem;
    cursor: pointer;
}
.actionBtn:hover { /* for poke_page only */
    border: 1px solid #f1f1f1;
    background-color: #4A4A4A;
    color: #f1f1f1;
    transition: 0.2s;
}
  
</style>
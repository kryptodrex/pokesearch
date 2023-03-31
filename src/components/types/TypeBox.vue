<template>
    <div :class="'type-' + typeInfo.type.name" v-for="typeInfo in types" v-bind:key="typeInfo.slot">
        {{ toUpper(typeInfo.type.name) }}
    </div>
</template>

<script>

</script>

<style scopes lang="css">
[class*="type-"] {
    border-radius: 0.625rem;

    padding: 0.2rem 1rem;
    margin: 0 0.5rem;
    min-width: 5.625rem;
    text-align: center;

    /* cursor: pointer; */
}
</style>
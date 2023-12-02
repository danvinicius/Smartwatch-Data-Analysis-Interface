<template>
    <h2>
        <slot></slot>
    </h2>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
h2 {
    font-family: var(--type-second);
    line-height: 1;
    font-size: 2rem;
    margin: 1rem 0;
    position: relative;
    z-index: 1;

    &::after {
        content: "";
        display: block;
        position: absolute;
        background-color: #3ecf72;
        height: 1rem;
        width: 1rem;
        border-radius: 0.2rem;
        z-index: -1;
        bottom: 5px;
        left: -5px;
    }
}
</style>
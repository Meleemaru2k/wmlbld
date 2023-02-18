<template>
  <div class="neon">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
//@TODO make colors adjustable
</script>

<style scoped lang="postcss">
.neon {
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
    0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;
}
</style>

<template>
  <div class="item-select-neon"><slot></slot></div>
</template>

<script setup lang="ts">
//@TODO make colors adjustable
</script>

<style scoped lang="postcss">
.item-select-neon {
  @apply w-full transition-all shrink-0;
  &:hover {
    @apply active-link scale-110;
  }
}
.active-link {
  @apply font-bold bg-slate-600 border border-solid border-white shadow-md shadow-black;
  text-shadow: 0 0 0.07em #fff, 0 0 0.1em #fff, 0 0 0.21em #fff,
    0 0 0.42em #bc13fe, 0 0 0.5em #bc13fe;
}
</style>

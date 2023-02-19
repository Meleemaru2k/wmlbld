<template>
  <div
    class="font-texty text-style text-white px-1 font-bold bg-slate-600 bg-opacity-75"
  >
    <slot />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="postcss">
.text-style {
  text-shadow: 0 0 0.1em #ffffff, 0 0 0.2em #000000;
}
</style>

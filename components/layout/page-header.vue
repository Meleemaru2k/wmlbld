<template>
  <div class="bg-slate-900 text-stone-100 w-full flex flex-col pt-4 mb-4">
    <h1 class="text-center text-stone-100">{{ headline }}</h1>
    <div class="mb-4 px-4 mx-auto">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["headline"]);
</script>

<template>
  <div
    class="absolute right-4 bottom-2 text-md font-bold px-1 text-yellow-100 bg-[rgba(0,0,0,0.5)]"
    style="text-shadow: 2px 2px 2px black"
  >
    {{ letters[row - 1] }} {{ column }}
  </div>
</template>
<script setup lang="ts">
defineProps({
  row: { type: Number, required: true },
  column: { type: Number, required: true },
});

const letters = "ABCDEFGHIJKLMNOP";
</script>

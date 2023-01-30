<template>
  <div class="absolute bottom-2 right-2 font-bold text-white px-1 bg-slate-600">
    {{ eggCount }}⭐
  </div>
</template>
<script setup lang="ts">
defineProps(["eggCount"]);
</script>

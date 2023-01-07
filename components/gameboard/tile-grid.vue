<template>
  <div
    class="flex flex-row flex-nowrap pointer-events-none"
    v-for="row in rows"
    :key="row"
    :style="{ height: `${100 / rows}%` }"
  >
    <div
      :style="{ width: `${100 / columns}%` }"
      v-for="column in columns"
      :key="column"
      class="border-r-2 border-t-2 border-dashed border-slate-700 relative"
      :class="{ 'border-l-2': column === 1, 'border-b-2': row === rows }"
    >
      <TileIndicator :row="row" :column="column" />
    </div>
  </div>
</template>
<script setup lang="ts">
import TileIndicator from "./tile-indicator.vue";
defineProps({
  columns: { type: Number, required: true },
  rows: { type: Number, required: true },
});
</script>

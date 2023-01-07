<template>
  <button
    class="rounded border-solid border-slate-200 border-[1px] px-3 py-1 text-center"
    :class="theme"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  theme: {
    type: Object as PropType<"primary" | "secondary" | "success" | "error">,
    required: false,
    default: "primary",
  },
});
</script>

<style scoped lang="pcss">
.primary{
  @apply bg-blue-500
}

.secondary{
  @apply bg-slate-500
}

.success{
  @apply bg-green-500
}

.error{
  @apply bg-red-500
}
</style>

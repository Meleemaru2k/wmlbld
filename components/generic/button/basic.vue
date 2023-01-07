<template>
  <button
    class="rounded shadow-inner border-solid border-[rgba(0,0,0,0.2)] border-[1px] px-3 py-1 text-center"
    :class="theme"
    @click="useSfx().sounds.button_click.play()"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  theme: {
    type: String as PropType<"primary" | "secondary" | "success" | "error">,
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

<template>
  <button
    class="rounded shadow-inner transition-all relative border-solid border-[rgba(0,0,0,0.2)] border-[1px] px-3 py-1 text-center font-semibold font-mono"
    :class="[theme, { loading__all: loading }, { 'saturate-0': disabled }]"
    :disabled="disabled"
    @click="
      {
        useSfx().sounds.button_click.pause();
        useSfx().sounds.button_click.currentTime = 0;
        useSfx().sounds.button_click.play();
      }
    "
  >
    <div
      v-show="loading"
      class="flex flex-col items-center h-full w-10 bg-[rgba(0,0,0,0.2)] absolute left-0 top-0"
    >
      <span
        class="absolute top-1/2 -translate-y-1/2 loading__cloud items-center text-xl"
        >📨</span
      >
    </div>
    <span v-show="!loading">
      <slot />
    </span>
    <span v-show="loading">Lädt...</span>
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
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
});
</script>

<style scoped lang="pcss">
.primary {
  @apply bg-blue-500 text-slate-100;
}

.secondary {
  @apply bg-slate-500 text-slate-100;
}

.success {
  @apply bg-green-500 text-slate-100;
}

.error {
  @apply bg-red-500 text-slate-100;
}

.loading__all {
  animation: loading linear 0.5s infinite alternate;
}
.loading__cloud {
  animation: loading__cloud linear 1s infinite alternate;
  transform-origin: center;
}

@keyframes loading__cloud {
  0% {
    scale: 1;
  }
  50% {
    scale: 1.1;
  }
  100% {
    scale: 1;
  }
}
@keyframes loading{
  0% {
    filter: brightness(0.9);
    -webkit-filter: brightness(0.9);

  }
  100% {
    filter: brightness(1.1);
    -webkit-filter: brightness(1.1);

  }
}
</style>

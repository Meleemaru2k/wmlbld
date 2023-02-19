<template>
  <button @click="clickHandler" class="button" :class="{ active: isActive }">
    <div><slot></slot></div>
  </button>
</template>
<script setup lang="ts">
const props = defineProps(["isActive"]);
function clickHandler() {
  useSfx().sounds(SFX.button_click).play();
  emit("click");
}
const emit = defineEmits<{
  (event: "click"): void;
}>();
</script>
<style scoped lang="postcss">
.button {
  @apply transition-all duration-100 bg-slate-900 text-2xl font-bold rounded-md leading-tight p-[6px] border border-solid border-slate-600;
  & > * {
    @apply transition-all duration-100;
  }
  &:hover,
  &:focus {
    @apply active;
    & > * {
      @apply scale-125 -rotate-6;
    }
  }
}
.active {
  @apply font-bold bg-slate-600 border border-solid border-white shadow-md shadow-black;
  text-shadow: 0 0 0.07em #fff, 0 0 0.1em #fff, 0 0 0.2em #fff,
    0 0 0.3em #bc13fe, 0 0 0.5em #bc13fe;
}
</style>

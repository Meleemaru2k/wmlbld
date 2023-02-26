<template>
  <div class="cardwobble">
    <slot />
  </div>
</template>
<script setup lang="ts">
//@TODO make colors adjustable
</script>
<style scoped lang="postcss">
.cardwobble {
  @apply p-[1px] m-0 transition-all box-border h-full w-full;
  &:hover,
  :focus,
  :active,
  :focus-visible :focus-wihtin {
    @apply rounded-md p-[1px] m-0 scale-105;
    box-shadow: 0px 0px 0px rgba(255, 255, 255);
    animation: wobble 1s linear infinite;
  }
}

@keyframes wobble {
  0% {
    @apply border-orange-300;
    box-shadow: 0px 0px 10px rgb(255, 213, 135);
  }
  50% {
    @apply border-white;
    box-shadow: 0px 0px 20px rgb(255, 255, 255);
  }
  85% {
    @apply border-blue-400;
    box-shadow: 0px 0px 10px rgb(135, 221, 255);
  }
  100% {
    @apply border-orange-300;
    box-shadow: 0px 0px 10px rgb(255, 213, 135);
  }
}
</style>

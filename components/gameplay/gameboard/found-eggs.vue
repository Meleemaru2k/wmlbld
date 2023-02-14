<template>
  <TransitionGroup name="star">
    <EggObjectIndicator
      v-for="(egg, index) in gameState?.foundEggs.value"
      :key="index"
      :egg="egg"
    >
    </EggObjectIndicator>
  </TransitionGroup>
</template>
<script setup lang="ts">
import EggObjectIndicator from "~~/components/game-utils/egg-object-indicator.vue";

const gameState = inject(gameState_IK);

watch(
  () => gameState?.foundEggs.value.size,
  () => {
    useSfx().sounds(SFX.egg_found).play();
  }
);
</script>

<style scoped lang="postcss">
.star-enter-active,
.star-leave-active {
  transition: opacity 0.5s ease;
  animation: plop 0.5s linear;
}

.star-enter-from,
.star-leave-to {
  opacity: 0;
  animation: plop 0.5s linear;
}

@keyframes plop {
  0% {
    scale: 0.5;
    transform: rotate(360deg);
  }
  30% {
    scale: 0.85;
  }
  50% {
    scale: 1.1;
  }
  85% {
    scale: 1.2;
    transform: rotate(0deg);
  }
  90% {
    scale: 0.95;
  }
  100% {
    scale: 1;
  }
}
</style>

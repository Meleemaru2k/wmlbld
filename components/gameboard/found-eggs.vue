<template>
  <TransitionGroup name="star">
    <GenericContainerStyleRainbowBorder
      v-for="(egg, index) in gameState?.foundEggs.value"
      :key="index"
      class="absolute rounded-full pointer-events-none origin-center"
      :style="`top: ${egg.pos_y - egg.size}px; left: ${
        egg.pos_x - egg.size
      }px; width:${egg.size * 2}px; height:${egg.size * 2}px;`"
      ><div
        class="absolute shadow-lg shadow-white bg-slate-700 rounded-full w-[90%] h-[90%] m-auto"
      >
        <div
          class="text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <span
            class="text-3xl"
            style="
              text-shadow: 0px 0px 2px black, 0px 2px 1px black,
                0px 0px 16px white, 0px 0px 2px black;
            "
            >⭐
          </span>
        </div>
      </div>
    </GenericContainerStyleRainbowBorder>
  </TransitionGroup>
</template>
<script setup lang="ts">
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

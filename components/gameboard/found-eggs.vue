<template>
  <div
    v-for="(egg, index) in foundEggs"
    :key="index"
    class="star"
    :style="`top: ${egg.pos_y - egg.size}px; left: ${
      egg.pos_x - egg.size
    }px; width:${egg.size * 2}px; height:${egg.size * 2}px;`"
  >
    <div
      class="text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <span
        class="text-2xl"
        style="
          text-shadow: 0px 0px 6px violet, 0px 0px 6px white, 0px 0px 12px black;
        "
        >⭐
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Egg } from ".prisma/client";
import { PropType } from "vue";

const props = defineProps({
  foundEggs: {
    type: Object as PropType<Set<Egg>>,
    required: true,
  },
});

watch(
  () => props.foundEggs.size,
  () => {
    useSfx().sounds(SFX.egg_found).play();
  }
);
</script>

<style scoped lang="postcss">
.star {
  @apply shadow-lg shadow-white absolute bg-pink-500 rounded-full text-center border-solid border-violet-500 border-2 pointer-events-none;
  animation: plop 1s linear;
}

@keyframes plop {
  0% {
    scale: 0.3;
    transform: rotate(360deg);
    border: dotted 1px white;
  }
  30% {
    scale: 0.8;
  }
  50% {
    scale: 1.2;
    border: dashed 15px pink;
  }
  85% {
    scale: 1.3;
    transform: rotate(0deg);
    border: dotted 2px white;
  }
  90% {
    scale: 0.8;
  }
  100% {
    scale: 1;
  }
}
</style>

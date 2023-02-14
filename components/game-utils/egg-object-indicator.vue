<template>
  <GenericContainerStyleRainbowBorder
    class="absolute rounded-full pointer-events-none origin-center"
    :style="`top: ${egg.pos_y - egg.size}px; left: ${
      egg.pos_x - egg.size
    }px; width:${egg.size * 2}px; height:${egg.size * 2}px;`"
    ><div
      class="absolute shadow-lg shadow-white bg-slate-700 rounded-full w-[90%] h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
</template>

<script setup lang="ts">
import { Egg } from ".prisma/client";

const props = defineProps({
  egg: { type: Object as PropType<Egg>, required: true },
});
</script>

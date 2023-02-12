<template>
  <div
    v-dragscroll:hidden
    class="w-[100%] max-h-[75vh] overflow-hidden overscroll-contain shadow-2xl shadow-black border-2 border-solid border-white rounded-lg"
    :style="`cursor:${cursor};`"
    @mousedown="setCursor('grabbing')"
    @mouseup="setCursor('grab')"
  >
    <div
      class="overflow-auto overscroll-contain shadow-2xl shadow-black relative rounded-lg"
      :style="`height: ${grid.height}px; width: ${grid.width}px;`"
    >
      <div
        class="absolute top-0 left-0 w-full h-full"
        @click="handleGridClick($event)"
      >
        <img ref="gameImage" :src="gameState?.game.value.image" />
      </div>
      <tileGrid
        v-if="gameState?.showGrid.value"
        :rows="grid.rows"
        :columns="grid.columns"
      />
      <foundEggsVisual />
    </div>
  </div>
</template>

<script setup lang="ts">
import tileGrid from "./tile-grid.vue";
import foundEggsVisual from "./found-eggs.vue";
import { gameState_IK } from "~~/utils/injectionKeys";

const gameState = inject(gameState_IK);
const gameImage = ref<HTMLImageElement>();
const grid = reactive({ height: 0, width: 0, rows: 6, columns: 4 });
const cursor = ref<String>("grab");

onMounted(() => {
  setTimeout(() => {
    grid.height = gameImage.value?.naturalHeight ?? 100;
    grid.width = gameImage.value?.naturalWidth ?? 100;
  }, 100);
});

function handleGridClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target) {
    return;
  }
  const rect = target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const foundEgg = pointIsInBox(x, y);
  if (foundEgg) {
    gameState?.foundEggs.value.add(foundEgg);
  }
}

function pointIsInBox(x: number, y: number) {
  for (const field of gameState?.game?.value.eggs ?? []) {
    if (
      x >= field.pos_x - field.size &&
      x <= field.pos_x + field.size &&
      y >= field.pos_y - field.size &&
      y <= field.pos_y + field.size
    ) {
      return field;
    }
  }
  return null;
}

function setCursor(style: string) {
  cursor.value = style;
}
</script>

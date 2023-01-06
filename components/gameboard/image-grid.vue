<template>
  <div>
    <div
      class="flex flex-col w-full relative"
      :style="`height: ${grid.height}px; width: ${grid.width}px;`"
    >
      <div
        class="absolute top-0 left-0 w-full h-full"
        @click="handleGridClick($event)"
      >
        <img ref="gameImage" :src="`/games/${gameName}/img.jpg`" />
      </div>
      <TileGrid :rows="grid.rows" :columns="grid.columns" />
      <div
        v-for="(foundField, index) in foundFields"
        :key="index"
        class="absolute bg-green-500 rounded-full text-center border-solid border-green-900 border-2 pointer-events-none"
        :style="`top: ${foundField.y}px; left: ${foundField.x}px; width:${foundField.size}px; height:${foundField.size}px;`"
      >
        <div
          class="text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          👍🏻
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GameConfig } from "~~/types/game";
import TileGrid from "./tile-grid.vue";

const props = defineProps({
  gameName: { type: String, default: "samplegame" },
});

//const gamepath = await useFetch(`/api/games/${props.gameName}`);
const { data: gameconfig } = await useFetch<GameConfig>(
  `/games/${props.gameName}/config.json`
);

const gameImage = ref<HTMLImageElement>();
const grid = reactive({ height: 0, width: 0, rows: 6, columns: 4 });
const clickfields = gameconfig.value?.game.eggs ?? [];
const foundFields = ref<Set<GameConfig["game"]["eggs"][0]>>(new Set());

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
    foundFields.value.add(foundEgg);
  }
}

function pointIsInBox(x: number, y: number) {
  for (const field of clickfields) {
    if (
      x >= field.x - field.size &&
      x <= field.x + field.size &&
      y >= field.y - field.size &&
      y <= field.y + field.size
    ) {
      return { x: field.x, y: field.y, size: field.size };
    }
  }
  return null;
}
</script>

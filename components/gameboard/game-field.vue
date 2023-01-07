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
        <img ref="gameImage" :src="`/games/${gameName}/img.jpg`" />
      </div>
      <tileGrid v-if="showGrid" :rows="grid.rows" :columns="grid.columns" />
      <foundEggsVisual :found-eggs="foundEggs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GameConfig } from "~~/types/game";
import tileGrid from "./tile-grid.vue";
import foundEggsVisual from "./found-eggs.vue";

const props = defineProps({
  gameName: { type: String, default: "samplegame" },
  showGrid: { type: Boolean, default: false },
});

const { data: gameconfig } = await useFetch<GameConfig>(
  `/games/${props.gameName}/config.json`
);

const gameImage = ref<HTMLImageElement>();
const grid = reactive({ height: 0, width: 0, rows: 6, columns: 4 });
const clickfields = gameconfig.value?.game.eggs ?? [];
const foundEggs = ref<Set<GameConfig["game"]["eggs"][0]>>(new Set());
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
    foundEggs.value.add(foundEgg);
    if (allEggsFoundCheck()) {
      emit("gamewon");
    }
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
      return field;
    }
  }
  return null;
}

function allEggsFoundCheck() {
  if (foundEggs.value.size === gameconfig.value?.game.eggs.length) {
    return true;
  } else {
    return false;
  }
}

function setCursor(style: string) {
  cursor.value = style;
}

const emit = defineEmits<{ (event: "gamewon"): void }>();
</script>

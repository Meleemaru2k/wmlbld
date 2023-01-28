<template>
  <div class="flex flex-col">
    <div
      class="bg-slate-900 text-stone-100 px-8 py-4 flex flex-row items-baseline gap-x-4 overflow-auto"
    >
      <div class="shrink-0 flex flex-row flex-nowrap w-28">
        <span class="text-xl">⌛</span>
        <span class="font-bold text-xl">{{ playtimeInSeconds }}s</span>
      </div>
      <div class="shrink-0 flex flex-row flex-nowrap w-18">
        {{ foundEggs }} / {{ gameconfig?.game.eggs.length }} ⭐
      </div>
      <basicButton class="shrink-0 flex flex-row flex-nowrap">
        <span>ℹ️ Info</span>
      </basicButton>

      <basicButton class="shrink-0" @click="toggleGrid()"
        >Raster <i>A</i></basicButton
      >
    </div>
    <div class="p-4 md:p-8 shadow-inner grow flex flex-col">
      <gameField
        @gamewon="gamewon = true"
        @update-found-eggs="foundEggs = $event"
        v-if="gamewon === false && gameconfig"
        :game-name="gameName"
        :gameconfig="gameconfig"
        :show-grid="showGrid"
      ></gameField>
      <div v-else class="flex flex-col">
        <div>Gewonnen!</div>
        <div>Zeit: {{ playtimeInSeconds }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import gameField from "~~/components/gameboard/game-field.vue";
import basicButton from "~~/components/generic/button/basic.vue";
import { GameConfig } from "~~/types/game";

const gameName = <string>useRoute().params.name ?? "samplegame";
const { data: gameconfig } = await useFetch<GameConfig>(
  `/games/${gameName}/config.json`
);
const gamewon = ref(false);
const foundEggs = ref(0);
const showGrid = ref(false);
const backgroundImageIndex = Math.floor(Math.random() * 6);

const timeStarted = new Date();
const {
  timestamp,
  pause: timestamp_pause,
  resume: timestamp_resume,
} = useTimestamp({ controls: true });

function toggleGrid() {
  showGrid.value = !showGrid.value;
}

const playtimeInSeconds = computed(() => {
  return (((timeStarted.getTime() - timestamp.value) * -1) / 1000).toFixed(0);
});

watch(gamewon, () => {
  timestamp_pause();
  useSfx().sounds.game_won.play();
});
</script>

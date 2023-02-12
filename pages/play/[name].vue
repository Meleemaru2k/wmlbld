<template>
  <div class="flex flex-col">
    <div v-if="game && !playerReady" class="w-full h-full flex">
      <div class="m-auto pb-12">
        <GenericContainerStyleItemSelectFunky class="shadow-lg shadow-black">
          <GenericContainerStyleRainbowBorder class="rounded-md">
            <basicButton @click="playerIsReady" class="!p-8 text-2xl"
              >Runde Starten</basicButton
            >
          </GenericContainerStyleRainbowBorder>
        </GenericContainerStyleItemSelectFunky>
      </div>
    </div>
    <div v-else-if="game">
      <div
        class="bg-slate-900 text-stone-100 px-8 py-4 flex flex-row items-baseline gap-x-4 overflow-auto"
      >
        <div class="shrink-0 flex flex-row flex-nowrap w-28">
          <span class="text-xl">⌛</span>
          <span class="font-bold text-xl">{{ playtimeInSeconds }}s</span>
        </div>
        <div class="shrink-0 flex flex-row flex-nowrap w-18">
          {{ foundEggs.size }} / {{ game?.eggs.length }} ⭐
        </div>
        <basicButton class="shrink-0 flex flex-row flex-nowrap">
          <span>ℹ️ Info</span>
        </basicButton>
        <basicButton class="shrink-0" @click="toggleGrid()"
          >Raster <i>A</i></basicButton
        >
      </div>
      <div class="p-4 md:p-8 shadow-inner grow flex flex-col">
        <gameField v-if="gameWon === false"></gameField>
        <div v-else class="flex flex-col">
          <div>Gewonnen!</div>
          <div>Zeit: {{ playtimeInSeconds }}</div>
        </div>
      </div>
      <div v-if="!game">Kein Spiel gefunden</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Egg, Game } from ".prisma/client";
import { gameState_IK } from "~~/utils/injectionKeys";
import { GameWithEggs } from "~~/types/game";
import gameField from "~~/components/gameboard/game-field.vue";
import basicButton from "~~/components/generic/button/basic.vue";

const gameName = <string>useRoute().params.name ?? "samplegame";
const { data: game } = await useFetch<Game & { eggs: Array<Egg> }>(
  `/api/game/find/name/${gameName}`
);

if (!game.value) {
  await navigateTo("/dashboard");
}
const gameWon = ref(false);
const foundEggs = ref(new Set<Egg>());
const showGrid = ref(false);
const playerReady = ref(false);

let timeStarted = new Date();
let {
  timestamp,
  pause: timestamp_pause,
  resume: timestamp_resume,
} = useTimestamp({ controls: true });
timestamp_pause();

function toggleGrid() {
  showGrid.value = !showGrid.value;
}

const playtimeInSeconds = computed(() => {
  return (((timeStarted.getTime() - timestamp.value) * -1) / 1000).toFixed(0);
});

watch(
  foundEggs,
  () => {
    if (foundEggs.value.size === game.value?.eggs.length) {
      gameWon.value = true;
    }
  },
  { deep: true }
);

function playerIsReady() {
  timeStarted = new Date();
  timestamp_resume();
  playerReady.value = true;
}

watch(gameWon, () => {
  timestamp_pause();
  useSfx().sounds(SFX.game_won).play();
});

provide(gameState_IK, {
  game: game as Ref<GameWithEggs>,
  playerReady,
  foundEggs,
  gameWon,
  showGrid,
  playtimeInSeconds,
});
</script>

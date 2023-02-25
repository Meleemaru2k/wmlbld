<template>
  <div class="flex flex-col relative">
    <div v-if="game && !playerIsReady" class="w-full h-full flex z-10">
      <div class="m-auto pb-12">
        <GenericContainerStyleItemSelectFunky class="shadow-lg shadow-black">
          <GenericContainerStyleRainbowBorder class="rounded-md">
            <BasicButton @click="setPlayerReady" class="!p-8 text-2xl"
              >Runde Starten</BasicButton
            >
          </GenericContainerStyleRainbowBorder>
        </GenericContainerStyleItemSelectFunky>
      </div>
    </div>
    <div v-if="game && playerIsReady">
      <div>
        <LayoutPageHeader
          ><div class="flex flex-row flex-nowrap gap-x-4 items-center">
            <div class="shrink-0 flex flex-row flex-nowrap w-20">
              <span class="text-xl hourglass">⌛</span>
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
        </LayoutPageHeader>
      </div>
      <div
        class="px-4 pb-4 md:px-4 shadow-inner grow flex flex-col w-fit mx-auto max-w-full"
      >
        <GameField v-if="gameWon === false"></GameField>
        <GameplayWinningScreen
          v-else
          :game="game"
          :playtime-in-seconds="playtimeInSeconds"
        />
      </div>
      <div v-if="!game">Kein Spiel gefunden</div>
    </div>
    <div
      class="curtains"
      :class="{
        'curtains-down': curtainState === 0,
        'curtains-up': curtainState === 1,
        'curtains-hidden': curtainState === 2,
      }"
    >
      <div class="w-full h-full">
        <img
          src="~/assets/images/curtain_overlay.png"
          class="w-full h-full object-cover opacity-100 grayscale contrast-150"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Egg, Game } from ".prisma/client";
import { gameState_IK } from "~~/utils/injectionKeys";
import { GameWithEggs } from "~~/types/game";
import GameField from "~~/components/gameplay/gameboard/game-field.vue";
import BasicButton from "~~/components/generic/button/basic.vue";

/**@TODO Make curtain component :) */

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
const playerIsReady = ref(false);
const curtainState = ref(0); //0 = down, 1 = up, 2 = hidden

let timeStarted = new Date();
const {
  timestamp,
  pause: timestamp_pause,
  resume: timestamp_resume,
} = useTimestamp({ controls: true });
timestamp_pause();

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

watch(gameWon, () => {
  timestamp_pause();
  useSfx().sounds(SFX.game_won).play();
});

function setPlayerReady() {
  timeStarted = new Date();
  timestamp_resume();
  useSfx().sounds(SFX.curtain_roll).play();
  playerIsReady.value = true;
  curtainState.value = 1;
  setTimeout(() => {
    curtainState.value = 2;
  }, 2000);
}

function toggleGrid() {
  showGrid.value = !showGrid.value;
}

provide(gameState_IK, {
  game: game as Ref<GameWithEggs>,
  playerReady: playerIsReady,
  foundEggs,
  gameWon,
  showGrid,
  playtimeInSeconds,
});
</script>

<style scoped lang="postcss">
.curtains {
  @apply transition-all duration-[2000ms] shadow-lg shadow-black;
  &-down {
    @apply absolute left-0 top-0 h-full w-full bg-orange-400;
  }
  &-up {
    @apply absolute left-0 -top-full h-full w-full bg-orange-400;
  }
  &-hidden {
    @apply hidden w-0 h-0;
  }
}

@keyframes curtains {
  0% {
    @apply h-full w-full top-0;
  }
  100% {
    @apply -top-full;
  }
}

.hourglass {
  @apply inline-block origin-center;
  animation: hourglass 6s infinite linear alternate;
}

@keyframes hourglass {
  0% {
    transform: rotate(0deg);
  }
  45% {
    transform: rotate(0deg);
    translate: 0px;
  }
  50% {
    transform: rotate(180deg);
    translate: 0px -5px;
  }
  55% {
    transform: rotate(360deg);
    translate: 0px;
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

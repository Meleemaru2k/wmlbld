<template>
  <div>
    <LayoutPageHeader headline="Spielauswahl">
      <div class="flex flex-row">
        <div>
          Suche: [ ---------TEXT--------- ] | Art: [ ---------Dropdown---------
          ]
        </div>
      </div></LayoutPageHeader
    >
    <div class="relative overflow-hidden">
      <GenericContainerStyleRainbowBorder
        class="!-rotate-2 !my-2 md:!my-8 !w-[calc(100%+32px)] !-ml-4 shadow-md shadow-black"
      >
        <GenericContainerSlider class="bg-slate-600">
          <NuxtLink
            v-for="(game, index) in games"
            :key="game.id"
            :to="encodeURI(`/play/${game.name}`)"
            class="h-[400px]"
            :class="{ sway: index < 6 }"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <GenericContainerStyleItemSelectFunky>
              <GenericContainerCard
                class="shadow-md shadow-slate-900"
                :image="{ src: game.image, altText: game.name }"
                :options="{ showShine: true }"
                ><template #imageOverlay>
                  <div
                    class="absolute bottom-2 left-2 p-1 bg-slate-600 rounded-md"
                  >
                    ✅
                  </div>
                  <GameUtilsEggCountIndicator :eggCount="game.eggs.length" />
                </template>
                <template #headline>
                  {{ game.name }}
                </template>
                <template #mainContent>
                  {{ game.description }}
                </template>
                <template #bottomSmallInfo>
                  Autor: {{ game.author.name }}</template
                >
              </GenericContainerCard>
            </GenericContainerStyleItemSelectFunky>
          </NuxtLink>
        </GenericContainerSlider>
      </GenericContainerStyleRainbowBorder>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: games, refresh: refreshGames } = await useFetch(
  "/api/game/find/newest"
);
</script>
<style scoped lang="postcss">
.sway {
  @apply transition-all;
  transform-origin: top;
  animation: sway 2.5s ease-in-out;
}
@keyframes sway {
  0% {
    margin-top: -400px;
    transform: rotate(0deg);
  }
  5% {
    transform: rotate(-20deg);
  }
  18% {
    margin-top: 25px;
  }
  20% {
    margin-top: 0px;
  }
  30% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(-12deg);
  }
  80% {
    transform: rotate(5deg);
  }
  85% {
    transform: rotate(-1.5deg);
  }
  90% {
    transform: rotate(1deg);
  }
  93% {
    transform: rotate(-0.3deg);
  }
  97% {
    transform: rotate(0.1deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>

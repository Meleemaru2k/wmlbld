<template>
  <div>
    <LayoutPageHeader headline="Spielauswahl">
      <div class="flex flex-row">
        <div>Suche: [ ------------------ ]</div>
      </div></LayoutPageHeader
    >
    <div class="relative overflow-hidden">
      <GenericContainerStyleRainbowBorder
        class="!-rotate-2 !my-8 !w-[calc(100%+32px)] !-ml-4"
      >
        <GenericContainerSlider class="bg-slate-600">
          <NuxtLink
            v-for="(game, index) in games"
            :key="game.id"
            :to="encodeURI(`/play/${game.name}`)"
            class="h-[400px]"
          >
            <GenericContainerStyleItemSelectFunky>
              <GenericContainerCard
                class="cardwobble"
                :image="{ src: game.image, altText: game.name }"
                :options="{ showShine: true }"
                ><template #imageOverlay>
                  <div class="absolute top-2 right-2 text-xl">✅</div>
                  <GameUtilsEggIndicator :eggCount="game.eggs.length" />
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

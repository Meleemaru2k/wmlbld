<template>
  <div>
    <LayoutPageHeader headline="Spielauswahl">
      <div class="flex flex-row">
        <div>Suche: [ ------------------ ]</div>
      </div></LayoutPageHeader
    >
    <div class="relative overflow-hidden">
      <GenericContainerRainbowBorder
        class="!-rotate-2 !my-8 !w-[calc(100%+32px)] !-ml-4"
      >
        <GenericContainerSlider class="bg-slate-600">
          <NuxtLink
            v-for="(game, index) in games"
            :key="game.id"
            :to="encodeURI(`/play/${game.name}`)"
            class="h-[400px]"
          >
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
          </NuxtLink>
        </GenericContainerSlider>
      </GenericContainerRainbowBorder>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: games, refresh: refreshGames } = await useFetch(
  "/api/game/find/newest"
);
</script>

<style scoped lang="postcss">
.cardwobble {
  @apply p-[1px] m-0 transition-all box-border;
  &:hover {
    @apply rounded-md p-[1px] m-0;
    @apply contrast-125;
    box-shadow: 0px 0px 0px rgba(255, 255, 255);
    animation: wobble 1s linear infinite;
  }
}

@keyframes wobble {
  0% {
    @apply border-orange-300;
    box-shadow: 0px 0px 10px rgb(255, 213, 135);
  }
  50% {
    @apply border-white;
    box-shadow: 0px 0px 20px rgb(255, 255, 255);
  }
  85% {
    @apply border-blue-400;
    box-shadow: 0px 0px 10px rgb(135, 221, 255);
  }
  100% {
    @apply border-orange-300;
    box-shadow: 0px 0px 10px rgb(255, 213, 135);
  }
}
</style>

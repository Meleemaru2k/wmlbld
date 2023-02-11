<template>
  <div>
    <LayoutPageHeader headline="Neuste Spiele"> </LayoutPageHeader>
    <div class="px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink
          v-for="(game, index) in games"
          :key="game.id"
          :to="encodeURI(`/play/${game.name}`)"
          class="h-[330px]"
        >
          <GenericContainerCard
            class="h-[330px] cardwobble"
            :image="{ src: game.image, altText: game.name }"
            :options="{ showShine: true }"
            ><template #imageOverlay>
              <GameUtilsEggIndicator :eggCount="game.eggs.length" />
            </template>
            <template #headline>
              {{ game.name }}
            </template>
            <template #mainContent>
              {{ game.description }}
            </template>
            <template #bottomSmallInfo> Autor: {{ game.author.name }}</template>
          </GenericContainerCard>
        </NuxtLink>
      </div>
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
  box-sizing: border-box;
  &:hover {
    @apply rounded-md p-[1px] m-0;
    @apply contrast-125;
    box-shadow: 0px 0px 0px rgba(255, 255, 255);
    border: 0.5px solid white;
    animation: wobble 1s ease-in infinite;
  }
}

@keyframes wobble {
  0% {
    @apply p-[1px] m-0;
    box-shadow: 0px 0px 10px rgb(255, 213, 135);
  }
  50% {
    @apply p-0 m-[1px];
    box-shadow: 0px 0px 20px rgb(255, 255, 255);
  }
  70% {
    box-shadow: 0px 0px 10px rgb(135, 221, 255);
  }
  100% {
    @apply p-[1px] m-0;
    box-shadow: 0px 0px 10px rgb(255, 213, 135);
  }
}
</style>

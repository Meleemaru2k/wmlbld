<template>
  <div>
    <LayoutPageHeader headline="Neuste Spiele"> </LayoutPageHeader>
    <div class="px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden">
        <NuxtLink
          v-for="game in games"
          :key="game.id"
          :to="`/play/${game.name}`"
        >
          <div
            class="flex flex-col bg-blue-400 border-slate-900 border-[1px] border-solid rounded-md h-full relative"
          >
            <div class="relative overflow-hidden">
              <img
                :src="game.image"
                :alt="game.name"
                class="w-full h-48 object-cover hover:scale-[5] transition-all rounded-t-md"
              />
              <GameUtilsEggIndicator :eggCount="game.eggs.length" />
            </div>
            <div
              class="p-4 [&_*]:mb-2 [&_*]:text-center border-black border-t-[1px] border-solid relative"
            >
              <div class="font-bold text-xl">
                {{ game.name }}
              </div>
              <div class="text-sm text-stone-100">
                {{ game.description }}
              </div>
            </div>
            <div class="text-xs text-stone-100 flex absolute right-2 bottom-1">
              <span class="ml-auto">Autor: {{ game.author.name }}</span>
            </div>
          </div>
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

<style scoped lang="postcss"></style>

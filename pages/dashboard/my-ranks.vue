<template>
  <div class="relative">
    <LayoutPageHeader headline="Rankings"> </LayoutPageHeader>
    <div class="px-4 pb-4 mx-auto w-full md:max-w-md">
      <div
        v-for="(game, index) in gameData"
        :key="index"
        class="flex flex-col mt-2 p-4 rounded-md text-slate-50 shadow-md shadow-black"
        :class="{ 'bg-slate-600': index % 2, 'bg-slate-700': !(index % 2) }"
      >
        <h2 class="text-center mb-2 text-slate-50">
          {{ game.name }}
        </h2>
        <div class="flex flex-row gap-x-4">
          <div class="overflow-hidden w-[160px]">
            <img class="object-cover rounded-md" :src="game.image" />
          </div>
          <div class="">
            <div
              v-for="(score, scoreIndex) in game.scores"
              class="[&_>*]:mr-2"
              :class="{ 'font-bold': data?.user?.name == score.user.name }"
            >
              <span>{{ scoreIndex + 1 }}.</span>
              <span>{{ score.user.name }}</span>
              <span>-</span>
              <span>🏁 {{ score.score }}s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { status, data } = useSession();
const { data: gameData } = await useFetch("/api/me/game/rankings/byLatest");
</script>

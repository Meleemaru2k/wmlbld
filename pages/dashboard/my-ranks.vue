<template>
  <div class="relative">
    <LayoutPageHeader headline="Meine Platzierungen"> </LayoutPageHeader>
    <div class="px-4 pb-4 mx-auto w-full md:max-w-lg" v-if="gameData?.length">
      <ItemSelectFunky
        v-for="(game, index) in gameData"
        :key="index"
        role="button"
        tabindex="0"
        class="flex flex-row mt-2 rounded-none overflow-hidden hover:!my-2 text-slate-50 shadow-md shadow-black cursor-pointer border-slate-900 border-[1px] border-solid"
        :class="{
          'bg-slate-600': index % 2,
          'bg-slate-700': !(index % 2),
          'rounded-t-md': index === 0,
          'rounded-b-md': index === gameData.length - 1,
        }"
        @click="goToGame(game.name)"
        @keydown.enter="goToGame(game.name)"
      >
        <div class="flex flex-row gap-x-4">
          <div
            class="overflow-hidden h-auto w-[160px] shrink-0 grow-0"
            :class="{
              'rounded-tl-md': index === 0,
              'rounded-bl-md': index === gameData.length - 1,
            }"
          >
            <img
              class="object-cover h-full w-full scale-[3]"
              :src="game.image"
            />
          </div>
          <div class="flex flex-col p-2">
            <h2 class="mb-1 text-slate-50">
              {{ game.name }}
            </h2>
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
      </ItemSelectFunky>
    </div>
  </div>
</template>
<script setup lang="ts">
import ItemSelectFunky from "~~/components/generic/container/style/item-select-funky.vue";

const { status, data } = useSession();
const { data: gameData } = await useFetch("/api/me/game/rankings/byLatest");
function goToGame(gameName: string) {
  navigateTo(`/play/${gameName}`);
}
</script>

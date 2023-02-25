<template>
  <div>
    <LayoutPageHeader headline="Spielauswahl">
      <div class="flex flex-row flex-wrap gap-4 justify-center">
        <GenericInputText
          v-model="filter.searchTerm"
          placeholder="Suchbegriff..."
          label="Suchbegriff"
          maxChars="20"
          class="w-[200px]"
        />
        <GenericInputDropdown
          class="w-[100px] md:w-[200px]"
          :options="filterOptions"
          label="Filter"
          v-model="filter.type"
        />
      </div>
    </LayoutPageHeader>
    <div class="relative overflow-hidden">
      <GenericContainerStyleRainbowBorder
        class="!-rotate-1 !mt-2 !mb-4 md:!my-8 !w-[calc(100%+32px)] !min-h-[400px] !-ml-4 shadow-md shadow-black"
        ><div v-show="isLoading" class="nogames-info">Suche Spiele...</div>
        <div v-show="data?.length === 0 && !isLoading" class="nogames-info">
          Keine Spiele gefunden
        </div>
        <GenericContainerSlider
          class="!bg-slate-700 h-full"
          v-show="data?.length > 0 && !isLoading"
        >
          <NuxtLink
            v-for="(game, index) in data"
            :key="game.id"
            :to="encodeURI(`/play/${game.name}`)"
            class="h-[400px]"
            :class="{ sway: index < 6 }"
            :style="{ animationDelay: `${index * 0.2}s` }"
            @mouseenter="useSfx().sounds(SFX.plopp).play()"
          >
            <GenericContainerStyleItemSelectFunky>
              <GenericContainerCard
                class="shadow-md shadow-slate-900"
                :image="{ src: game.image, altText: game.name }"
                :options="{ showShine: true }"
                ><template #imageOverlay>
                  <MicroInfoIndicator class="absolute bottom-2 left-2">
                    <span class="mr-1">
                      🏁
                      <span class="pr-1" v-if="game.scores[0]">
                        {{ game.scores[0]?.score }}s </span
                      ><span v-else>-</span></span
                    >
                    <span
                      >❤️
                      {{ game._count.scores }}
                    </span>
                  </MicroInfoIndicator>

                  <MicroInfoIndicator class="absolute bottom-2 right-2"
                    >{{ game.eggs.length }}⭐</MicroInfoIndicator
                  >
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
import MicroInfoIndicator from "~~/components/generic/container/utils/micro-info-indicator.vue";
import { GameWithEggsScoreAuthor } from "~~/types/game";

const data = ref<Array<GameWithEggsScoreAuthor>>([]);
const filterOptions = ["Neuste", "Spielname", "Autor", "Ungespielt"];
const filter = reactive({ type: "0", searchTerm: "" });
const isLoading = ref(false);
let lastFilter: FilterOptions = 0;

onMounted(async () => {
  isLoading.value = true;

  const fetch = await useFetch("/api/game/search/newest");
  data.value = (fetch.data.value as GameWithEggsScoreAuthor[]) ?? [];
  lastFilter = FilterOptions.Newest;

  isLoading.value = false;
});

const onFilterChange = useDebounceFn(async () => {
  isLoading.value = true;
  let apiUrl = `/api/game/search/newest`;

  const filterType = parseInt(filter.type);
  const dontRerunThoseFilters = [FilterOptions.Newest, FilterOptions.Unplayed];
  const dontRunWithoutInputFilter = [FilterOptions.Name, FilterOptions.Author];

  if (dontRerunThoseFilters.includes(filterType) && lastFilter === filterType) {
    isLoading.value = false;
    return;
  }

  if (
    dontRunWithoutInputFilter.includes(filterType) &&
    (!filter.searchTerm || filter.searchTerm.length < 3)
  ) {
    isLoading.value = false;
    return;
  }

  switch (filterType) {
    case FilterOptions.Newest:
      apiUrl = `/api/game/search/newest`;
      break;
    case FilterOptions.Name:
      if (filter.searchTerm)
        apiUrl = `/api/game/search/name/${filter.searchTerm}`;
      break;
    case FilterOptions.Author:
      if (filter.searchTerm)
        apiUrl = `/api/game/search/author/${filter.searchTerm}`;
      break;
    case FilterOptions.Unplayed:
      apiUrl = `/api/me/game/search/unplayed`;
      break;
    default:
      apiUrl = `/api/game/search/newest`;
      break;
  }

  const fetch = await useFetch(apiUrl);
  data.value = (fetch.data.value as GameWithEggsScoreAuthor[]) ?? [];
  lastFilter = filterType;

  isLoading.value = false;
}, 1500);

watch(filter, async () => {
  await onFilterChange();
});

enum FilterOptions {
  Newest,
  Name,
  Author,
  Unplayed,
}
</script>
<style scoped lang="postcss">
.nogames-info {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white text-3xl font-bold text-center;
}
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

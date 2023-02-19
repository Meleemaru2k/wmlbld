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
          class="w-[200px]"
          :options="filterOptions"
          label="Filter"
          v-model="filter.type"
        />
      </div>
    </LayoutPageHeader>
    <div class="relative overflow-hidden">
      <GenericContainerStyleRainbowBorder
        v-show="data?.length > 0"
        class="!-rotate-2 !my-2 md:!my-8 !w-[calc(100%+32px)] !h-[460px] !-ml-4 shadow-md shadow-black"
      >
        <GenericContainerSlider class="!bg-slate-700 h-full">
          <NuxtLink
            v-for="(game, index) in data"
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
                  <MicroInfoIndicator class="absolute bottom-2 left-2">
                    🏆
                    <span class="pr-1" v-if="game.scores[0]">
                      {{ game.scores[0]?.score }}s</span
                    >
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

onMounted(async () => {
  const fetch = await useFetch("/api/game/usersearch/newest");
  data.value = (fetch.data.value as GameWithEggsScoreAuthor[]) ?? [];
});

const onFilterChange = useDebounceFn(async () => {
  let apiUrl = `/api/game/usersearch/newest`;
  switch (parseInt(filter.type)) {
    case FilterOptions.Newest:
      apiUrl = `/api/game/usersearch/newest`;
      break;
    case FilterOptions.Name:
      if (filter.searchTerm)
        apiUrl = `/api/game/usersearch/name/${filter.searchTerm}`;
      break;
    case FilterOptions.Author:
      if (filter.searchTerm)
        apiUrl = `/api/game/usersearch/author/${filter.searchTerm}`;
      break;
    case FilterOptions.Unplayed:
      apiUrl = `/api/game/usersearch/unplayed`;
      break;
    default:
      apiUrl = `/api/game/usersearch/newest`;
      break;
  }
  const fetch = await useFetch(apiUrl);
  console.log(fetch.data ?? fetch.error);
  data.value = (fetch.data.value as GameWithEggsScoreAuthor[]) ?? [];
}, 1500);

watch(
  filter,
  (newVal, oldVal) => {
    onFilterChange();
  },
  { deep: true }
);

enum FilterOptions {
  Newest,
  Name,
  Author,
  Unplayed,
}
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

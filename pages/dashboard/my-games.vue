<template>
  <div class="w-full overflow-hidden">
    <LayoutPageHeader headline="🕹️ Deine Spiele 🕹️" />
    <div class="" v-if="userGames">
      <div class="relative overflow-hidden">
        <GenericContainerRainbowBorder
          class="!-rotate-2 !my-8 !w-[calc(100%+32px)] !-ml-4"
        >
          <GenericContainerSlider class="bg-slate-600">
            <div v-for="(game, index) in userGames" :key="game.id">
              <GenericContainerCard
                class="cardwobble"
                :image="{ src: game.image, altText: game.name }"
                :options="{ showShine: true }"
                ><template #imageOverlay>
                  <div
                    class="absolute top-2 right-2 bg-slate-500 rounded-md p-1 text-white text-xs"
                  >
                    Game Played XXXX times 🔥
                  </div>
                  <GameUtilsEggIndicator :eggCount="game.eggs.length" />
                </template>
                <template #headline>
                  {{ game.name }}
                </template>
                <template #mainContent>
                  <div>{{ game.description }}</div>
                  <div class="mt-4 flex flex-col gap-y-2 items-center">
                    <NuxtLink :to="'/play/' + game.name" class="w-48">
                      <GenericButtonBasic theme="primary" class="w-48 !m-0">
                        Selber Spielen
                      </GenericButtonBasic>
                    </NuxtLink>
                    <GenericButtonBasic theme="warning" class="w-48">
                      Editieren
                    </GenericButtonBasic>
                    <GenericButtonBasic
                      class="w-48"
                      theme="error"
                      :confirm-click="true"
                      @click="deleteGame(game.id)"
                      :loading="deleteGameButtonLoading"
                    >
                      Löschen
                    </GenericButtonBasic>
                    <GenericButtonBasic
                      :disabled="true"
                      theme="primary"
                      class="w-48"
                    >
                      Bestenlise Ansehen
                    </GenericButtonBasic>
                  </div>
                </template>
                <template #bottomSmallInfo> Autor: Du!</template>
              </GenericContainerCard>
            </div>
          </GenericContainerSlider>
        </GenericContainerRainbowBorder>
      </div>
    </div>
    <div v-else>Keine Spiele gefunden :(</div>
  </div>
</template>

<script setup lang="ts">
const { data: userGames, refresh: userGamesRefresh } = await useFetch(
  "/api/user/find/createdGames"
);

const deleteGameButtonLoading = ref(false);
async function deleteGame(id: number) {
  deleteGameButtonLoading.value = true;
  await useFetch("/api/game/delete/" + id);
  await userGamesRefresh();
  deleteGameButtonLoading.value = false;
}
</script>

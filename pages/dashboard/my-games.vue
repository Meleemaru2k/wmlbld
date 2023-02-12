<template>
  <div class="w-full overflow-hidden">
    <LayoutPageHeader headline="🕹️ Deine Spiele 🕹️" />
    <div class="" v-if="userGames">
      <div class="relative overflow-hidden">
        <GenericContainerStyleRainbowBorder
          class="!-rotate-2 !my-8 !w-[calc(100%+32px)] !-ml-4"
        >
          <GenericContainerSlider class="bg-slate-600">
            <div v-for="(game, index) in userGames" :key="game.id">
              <GenericContainerStyleItemSelectFunky>
                <GenericContainerCard
                  :image="{ src: game.image, altText: game.name }"
                  :options="{ showShine: true }"
                  ><template #imageOverlay>
                    <div
                      class="absolute bottom-2 left-2 bg-slate-600 rounded-md px-1 py-[2px] text-white text-xs"
                    >
                      🔥 Played XXXX times
                    </div>
                    <GameUtilsEggIndicator :eggCount="game.eggs.length" />
                  </template>
                  <template #headline>
                    {{ game.name }}
                  </template>
                  <template #mainContent>
                    <div class="flex flex-col grow h-full">
                      <div>{{ game.description }}</div>
                      <div class="mt-auto flex flex-col gap-y-2 items-center">
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
                    </div>
                  </template>
                  <template #bottomSmallInfo> Autor: Du!</template>
                </GenericContainerCard>
              </GenericContainerStyleItemSelectFunky>
            </div>
          </GenericContainerSlider>
        </GenericContainerStyleRainbowBorder>
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

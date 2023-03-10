<template>
  <div class="w-full overflow-hidden">
    <LayoutPageHeader headline="Meine Spiele" />
    <div class="" v-if="userGames">
      <div class="relative overflow-hidden">
        <GenericContainerStyleRainbowBorder
          class="!-rotate-1 !mt-2 !mb-4 md:!my-8 !w-[calc(100%+32px)] !min-h-[400px] !-ml-4 shadow-md shadow-black"
        >
          <GenericContainerSlider
            v-show="userGames.length > 0"
            class="!bg-slate-700 h-full"
          >
            <div v-for="(game, index) in userGames" :key="game.id">
              <GenericContainerStyleItemSelectFunky>
                <GenericContainerCard
                  @mouseenter="useSfx().sounds(SFX.plopp).play()"
                  class="shadow-md shadow-slate-900 cursor-pointer"
                  :image="{ src: game.image, altText: game.name }"
                  :options="{ showShine: true }"
                  ><template #imageOverlay>
                    <MicroInfoIndicator class="absolute bottom-2 left-2"
                      >❤️ {{ game._count.scores }}</MicroInfoIndicator
                    >
                    <MicroInfoIndicator class="absolute bottom-2 right-2"
                      >{{ game.eggs.length }}⭐</MicroInfoIndicator
                    >
                  </template>
                  <template #headline>
                    {{ game.name }}
                  </template>
                  <template #mainContent>
                    <div class="flex flex-col grow h-full">
                      <div>{{ game.description }}</div>
                      <div
                        class="pt-4 mt-auto flex flex-row flex-wrap gap-2 items-center justify-center"
                      >
                        <NuxtLink :to="'/play/' + game.name" class="w-32">
                          <GenericButtonBasic
                            theme="primary"
                            class="w-full !m-0"
                          >
                            Spielen
                          </GenericButtonBasic>
                        </NuxtLink>
                        <GenericButtonBasic
                          :disabled="true"
                          theme="warning"
                          class="w-32"
                        >
                          Editieren
                        </GenericButtonBasic>
                        <GenericButtonBasic
                          :disabled="true"
                          theme="primary"
                          class="w-32"
                        >
                          Bestenlise
                        </GenericButtonBasic>
                        <GenericButtonBasic
                          class="w-32"
                          theme="error"
                          :confirm-click="true"
                          @click="deleteGame(game.id)"
                          :loading="deleteGameButtonLoading === game.id"
                        >
                          Löschen
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
    <LazyGenericContainerModal v-else class="w-[350px]">
      <div class="text-center">Keine Spiele gefunden :(</div>
    </LazyGenericContainerModal>
  </div>
</template>

<script setup lang="ts">
import MicroInfoIndicator from "~~/components/generic/container/utils/micro-info-indicator.vue";

const { data: userGames, refresh: userGamesRefresh } = await useFetch(
  "/api/me/game/created"
);

const deleteGameButtonLoading = ref<number | null>(null); // id of game
async function deleteGame(id: number) {
  deleteGameButtonLoading.value = id;
  await useFetch("/api/game/delete/" + id);
  await userGamesRefresh();
  deleteGameButtonLoading.value = null;
}
</script>

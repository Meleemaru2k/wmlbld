<template>
  <div class="w-full overflow-hidden">
    <LayoutPageHeader headline="🕹️ Deine Spiele 🕹️"
      >Momentanes Maximum sind 3 Spiele :)</LayoutPageHeader
    >
    <div
      class="rounded-t-md m-4 border-[1px] border-black border-solid overflow-auto"
      v-if="userGames"
    >
      <table class="w-full table-auto">
        <thead class="bg-pink-300">
          <tr class="text-left [&_th]:p-4 [&_th]:min-w-[200px]">
            <th>Name / Beschreibung</th>
            <th>Bild & Secrets</th>
            <th>Bearbeiten 📝</th>
            <th>Bestenliste 🔥</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="game in userGames"
            class="border-y-[1px] border-slate-600 border-solid [&_td]:p-4 [&_td]:odd:bg-pink-100 [&_td]:even:bg-blue-100"
          >
            <td class="text-center">
              {{ game.name }}<br /><span class="text-sm">{{
                game.description
              }}</span>
            </td>
            <td>
              <div class="max-w-[200px] max-h-[200px] relative">
                <img width="200" height="200" :src="game.image" />
                <div
                  class="absolute bottom-2 right-2 font-bold text-white px-1 bg-slate-600"
                >
                  {{ game.eggs.length }}⭐
                </div>
              </div>
            </td>
            <td>
              <div class="flex flex-col gap-y-4">
                <GenericButtonBasic theme="primary" class="w-48">
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
              </div>
            </td>
            <td>
              <GenericButtonBasic theme="primary" class="w-48">
                Ansehen
              </GenericButtonBasic>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Keine Spiele gefunden :(</div>
  </div>
</template>

<script setup lang="ts">
const { data: userGames, refresh: userGamesRefresh } = await useFetch(
  "/api/user/createdGames"
);

const deleteGameButtonLoading = ref(false);
async function deleteGame(id: number) {
  deleteGameButtonLoading.value = true;
  await useFetch("/api/game/delete/" + id);
  await userGamesRefresh();
  deleteGameButtonLoading.value = false;
}
</script>

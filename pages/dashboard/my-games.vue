<template>
  <div class="w-full overflow-hidden">
    <div
      class="rounded-t-md m-4 border-[1px] border-black border-solid overflow-hidden"
      v-if="userGames"
    >
      <table class="w-full table-fixed">
        <thead class="bg-pink-300">
          <tr class="text-left [&_th]:p-4">
            <th>Name / Beschreibung</th>
            <th>Bild & Secrets</th>
            <th>Editieren 📝</th>
            <th>Löschen ❌</th>
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
              <GenericButtonBasic theme="primary">
                Editieren
              </GenericButtonBasic>
            </td>
            <td>
              <GenericButtonBasic theme="error"> Löschen </GenericButtonBasic>
            </td>
            <td>
              <GenericButtonBasic theme="primary"> Ansehen </GenericButtonBasic>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Keine Spiele gefunden :(</div>
  </div>
</template>

<script setup lang="ts">
const { data: userGames } = await useFetch("/api/user/createdGames");
</script>

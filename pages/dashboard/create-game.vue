<template>
  <div class="flex flex-col pb-12">
    <LayoutPageHeader headline="Spiel erstellen"
      ><ol class="flex flex-row flex-wrap md:flex-nowrap gap-x-4">
        <li>1. Bild hochladen</li>
        <li>2. Auf Punkt im Bild gedrückt halten um Secret zu erstellen</li>
        <li>3. Secret mit Infos schmücken</li>
        <li>4. Spiel beschreiben</li>
        <li>5. Hochladen :)</li>
      </ol>
    </LayoutPageHeader>
    <GenericInputImagePicker
      v-show="!gameData.image"
      class="mx-auto mb-4 p-2 bg-slate-100 rounded-md"
      @image-picked="onImageChange($event)"
    />

    <div class="flex flex-row flex-wrap md:flex-nowrap gap-4 px-4">
      <div class="basis-full md:basis-9/12 h-[600px] relative">
        <GameImage />
      </div>
      <div
        class="basis-full md:basis-3/12 grow-0 flex shrink-0 flex-col"
        v-show="gameData.image"
      >
        <div class="h-[600px] overflow-auto p-4 bg-slate-200 rounded-md t">
          <GameEditorEggEditor />
        </div>
      </div>
    </div>
    <div
      v-show="gameData.image"
      class="flex flex-row flex-wrap md:flex-nowrap gap-4 px-4 mt-4"
    >
      <GenericInputTextarea
        class="w-full md:w-[320px] bg-slate-200 p-2 rounded-t-md"
        label="Spiel-Name"
        v-model="gameData.name"
      />
      <GenericInputTextarea
        class="w-full mr-auto md:w-[320px] bg-slate-200 p-2 rounded-t-md"
        label="Spiel-Beschreibung"
        v-model="gameData.description"
      />
      <GenericButtonBasic
        class="ml-auto w-full md:w-3/12"
        theme="success"
        :disabled="!enableSaveButton"
        :loading="saveGameButtonLoading"
        @click="createGame"
        >Spiel speichern</GenericButtonBasic
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { convertImageToBase64 } from "~~/utils/imageConverter";
import useGameEditor from "~~/components/game-editor/composables/useGameEditor";
const { gameData, resetGame } = useGameEditor();

const saveGameButtonLoading = ref(false);
const enableSaveButton = computed(() => {
  return gameData.name && gameData.description && gameData.eggs.length > 0;
});

function onImageChange(inputElement: HTMLInputElement) {
  convertImageToBase64(inputElement).then((b64String) => {
    gameData.image = b64String;
  });
}

async function createGame() {
  saveGameButtonLoading.value = true;
  await useFetch("/api/game/create", {
    body: { gameData },
    method: "POST",
  })
    .then(async (data) => {
      if (!data.error.value) {
        await navigateTo("/dashboard/my-games");
        resetGame();
      } else {
        console.log({ err: data.error.value, gameData });
      }
    })
    .catch((err) => console.log({ err: err, gameData }))
    .finally(() => {
      saveGameButtonLoading.value = false;
    });
}

onUnmounted(() => {
  resetGame();
});
</script>

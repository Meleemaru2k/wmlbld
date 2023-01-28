<template>
  <div class="flex flex-col pb-12">
    <div class="bg-slate-900 text-stone-100 w-full flex flex-col pt-4 mb-4">
      <h1 class="text-center text-stone-100">Spiel erstellen</h1>
      <div class="mb-4 px-4 mx-auto">
        <ol class="flex flex-row gap-x-4">
          <li>1. Bild hochladen</li>
          <li>2. Auf Punkt im Bild gedrückt halten um Secret zu erstellen</li>
          <li>3. Secret mit Infos schmücken</li>
          <li>4. Spiel beschreiben</li>
          <li>5. Hochladen :)</li>
        </ol>
      </div>
    </div>
    <GenericInputImagePicker
      v-show="!base64image"
      class="mx-auto mb-4 p-2 bg-slate-100 rounded-md"
      @image-picked="onImageChange($event)"
    />

    <div class="flex flex-row flex-nowrap gap-x-4 px-4">
      <div class="basis-10/12 h-[600px] relative">
        <div
          v-dragscroll:hidden
          class="absolute w-full h-full overflow-hidden overscroll-contain rounded-md"
        >
          <div :style="imageDimensions" class="relative">
            <div
              v-for="(egg, index) in gameData.eggs"
              :key="index"
              class="absolute rounded-full cursor-pointer"
              :style="getEggPosAndSize(egg)"
            >
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style="text-shadow: 0px 0px 20px black"
                :style="`font-size:${egg.size * 2}px;`"
              >
                ⭐
              </div>
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold pt-2"
                style="text-shadow: 0px 0px 2px black"
                :style="`font-size:${egg.size}px;`"
              >
                {{ index }}
              </div>
            </div>
            <img ref="gameImage" :src="base64image" />
          </div>
        </div>
      </div>
      <div class="basis-2/12 flex shrink-0 flex-col">
        <div class="h-[600px] overflow-auto p-4 bg-slate-100 rounded-md t">
          <GameEditorEggEditor v-model="gameData.eggs" />
        </div>
        <GenericButtonBasic class="mt-4" theme="success" @click="createGame()"
          >Spiel speichern</GenericButtonBasic
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Egg } from "@prisma/client";
import { convertImageToBase64 } from "~~/utils/imageConverter";
const gameData = reactive({
  name: "abc",
  authorId: 1,
  passphrase: "sample",
  description: "Find things in this image! :)",
  image: "",
  eggs: [
    {
      id: null,
      gameId: null,
      pos_x: 1468,
      pos_y: 791,
      size: 25,
      description: "Find the jumping man in a yellow shirt",
      hint: "This person really loves to hang out at the beach",
    },
    {
      id: null,
      gameId: null,
      pos_x: 2565,
      pos_y: 1415,
      size: 50,
      description: "Find the jumping man in a yellow shirt",
      hint: "This person really loves to hang out at the beach",
    },
    {
      id: null,
      gameId: null,
      pos_x: 950,
      pos_y: 1205,
      size: 25,
      description: "Find the jumping man in a yellow shirt",
      hint: "This person really loves to hang out at the beach",
    },
    {
      id: null,
      gameId: null,
      pos_x: 2730,
      pos_y: 1115,
      size: 25,
      description: "Find the jumping man in a yellow shirt",
      hint: "This person really loves to hang out at the beach",
    },
  ] as unknown as Array<Egg>,
});

const image = ref<HTMLInputElement | null>(null);
const base64image = ref("");
const gameImage = ref<HTMLImageElement | null>(null);
const imageDimensions = reactive({ height: "100px", width: "100px" });

function onImageChange(inputElement: HTMLInputElement) {
  image.value = inputElement;

  convertImageToBase64(image.value).then((b64String) => {
    base64image.value = b64String;
  });

  setTimeout(() => {
    imageDimensions.height = gameImage.value?.naturalHeight.toString() + "px";
    imageDimensions.width = gameImage.value?.naturalWidth.toString() + "px";
  }, 100);
}

function getEggPosAndSize(egg: Egg) {
  return `top:${egg.pos_y - egg.size}px;left:${egg.pos_x - egg.size}px;width:${
    egg.size * 2
  }px;height:${egg.size * 2}px;`;
}

async function createGame() {
  gameData.image = image.value ? await convertImageToBase64(image.value) : "";
  console.log(gameData);
  //await useFetch("/api/game/create", {
  //  body: { gameData },
  //  method: "POST",
  //}).then((x) => console.log(x));
}
</script>

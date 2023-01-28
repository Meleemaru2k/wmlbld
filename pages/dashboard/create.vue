<template>
  <div class="flex flex-col">
    <h1 class="text-center">Create Game</h1>
    <div class="mb-4 px-4">
      <ol>
        <li>1. Bild hochladen</li>
        <li>2. Auf Punkt im Bild gedrückt halten um Secret zu erstellen</li>
        <li>3. Secret mit Infos schmücken</li>
        <li>4. Spiel beschreiben</li>
        <li>5. Hochladen :)</li>
      </ol>
    </div>
    <div class="flex flex-row flex-nowrap gap-x-4 mb-4 px-4">
      <div class="w-xs overflow-hidden">
        <GenericInputImagePicker @image-picked="onImageChange($event)" />
      </div>
      <GenericButtonBasic @click="createGame()"
        >Spiel erstellen</GenericButtonBasic
      >
    </div>
    <div class="flex flex-row flex-nowrap gap-0">
      <div class="basis-10/12">
        <img :src="base64image" />
      </div>
      <div class="basis-2/12 flex flex-col">
        Controls
        <div v-for="egg in gameData.eggs">{{ egg.description }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { convertImageToBase64 } from "~~/utils/imageConverter";
const gameData = reactive({
  name: "abc",
  authorId: 1,
  passphrase: "sample",
  description: "Find things in this image! :)",
  image: "",
  eggs: [
    {
      pos_x: 1468,
      pos_y: 791,
      size: 25,
      description: "Find the jumping man in a yellow shirt",
      hint: "This person really loves to hang out at the beach",
    },
    {
      pos_x: 2565,
      pos_y: 1415,
      size: 50,
      description: "Find the jumping man in a yellow shirt",
      hint: "This person really loves to hang out at the beach",
    },
    {
      pos_x: 950,
      pos_y: 1205,
      size: 25,
      description: "Find the jumping man in a yellow shirt",
      hint: "This person really loves to hang out at the beach",
    },
    {
      pos_x: 2730,
      pos_y: 1115,
      size: 25,
      description: "Find the jumping man in a yellow shirt",
      hint: "This person really loves to hang out at the beach",
    },
  ],
});

const image = ref<HTMLInputElement | null>(null);
const base64image = ref("");

function onImageChange(inputElement: HTMLInputElement) {
  image.value = inputElement;
}

watch(image, (imageValue) => {
  if (imageValue) {
    convertImageToBase64(imageValue).then((b64String) => {
      base64image.value = b64String;
    });
  }
});

async function createGame() {
  gameData.image = image.value ? await convertImageToBase64(image.value) : "";
  await useFetch("/api/game/create", {
    body: { gameData },
    method: "POST",
  }).then((x) => console.log(x));
}
</script>

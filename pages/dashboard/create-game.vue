<template>
  <div class="flex flex-col pb-12">
    <LayoutPageHeader headline="Spiel erstellen"
      ><ol class="flex flex-row flex-wrap md:flex-nowrap gap-x-4">
        <li>1. Bild hochladen</li>
        <li>2. Auf Punkt im Bild gedrückt halten um Secret zu erstellen</li>
        <li>3. Secret mit Infos schmücken</li>
        <li>4. Spiel beschreiben</li>
        <li>5. Hochladen :)</li>
      </ol></LayoutPageHeader
    >
    <GenericInputImagePicker
      v-show="!base64image"
      class="mx-auto mb-4 p-2 bg-slate-100 rounded-md"
      @image-picked="onImageChange($event)"
    />

    <div class="flex flex-row flex-wrap md:flex-nowrap gap-4 px-4">
      <div class="basis-full md:basis-9/12 h-[600px] relative">
        <div
          v-dragscroll:hidden
          ref="imageContainer"
          class="absolute w-full h-full overflow-hidden overscroll-contain rounded-md"
        >
          <div
            @drop="placeEggAtPosition($event)"
            @dragover.prevent
            @dragenter.prevent
            :style="{
              height: imageDimensions.height.toString() + 'px',
              width: imageDimensions.width.toString() + 'px',
            }"
            class="relative"
          >
            <div
              @drop.stop
              @mousedown.stop
              @touchstart.stop
              v-for="(egg, index) in gameData.eggs"
              :key="index"
              class="absolute rounded-full cursor-pointer bg-pink-300 border-dashed border-black border-4"
              :style="getEggPosAndSize(egg)"
            >
              <div
                class="w-full h-full relative select-auto"
                draggable
                @dragstart="currentlyDraggedEgg = egg"
              ></div>
              <div
                @click="removeEgg(index)"
                class="absolute -right-3 bottom-1/2 bg-white rounded-full select-none"
              >
                ❌
              </div>
              <div
                class="absolute left-1/2 top-1/2 p-1 text-slate-900 text-2xl font-bold select-none pointer-events-none -translate-x-1/2 -translate-y-1/2"
              >
                #{{ index }}
              </div>
            </div>
            <img
              ref="gameImage"
              draggable="false"
              :src="base64image"
              class="select-none"
            />
          </div>
        </div>
      </div>
      <div
        class="basis-full md:basis-3/12 grow-0 flex shrink-0 flex-col"
        v-show="image"
      >
        <div class="h-[600px] overflow-auto p-4 bg-slate-100 rounded-md t">
          <GameEditorEggEditor
            @silder-change="onSliderChange"
            @add-egg="addEgg"
            @remove-egg="removeEgg"
            v-model="gameData.eggs"
            :image="base64image"
            :image-dimensions="imageDimensions"
          />
        </div>
      </div>
    </div>
    <div
      v-show="image"
      class="flex flex-row flex-wrap md:flex-nowrap gap-4 px-4 mt-4"
    >
      <GenericInputTextarea
        class="w-full md:w-[320px]"
        label="Spiel-Name"
        v-model="gameData.name"
      />
      <GenericInputTextarea
        class="w-full mr-auto md:w-[320px]"
        label="Spiel-Beschreibung"
        v-model="gameData.description"
      />
      <GenericButtonBasic
        class="mt-4 ml-auto w-full md:w-3/12"
        theme="success"
        :disabled="!enableSaveButton"
        @click="createGame()"
        >Spiel speichern</GenericButtonBasic
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { Egg } from "@prisma/client";
import { convertImageToBase64 } from "~~/utils/imageConverter";
const gameData = reactive({
  name: "samplegame",
  authorId: 1,
  passphrase: "sample",
  description: "Find things in this image! :)",
  image: "",
  eggs: [] as Array<Egg>,
});

const image = ref<HTMLInputElement | null>(null);
const base64image = ref("");
const gameImage = ref<HTMLImageElement | null>(null);
const imageContainer = ref<HTMLElement | null>(null);
const imageDimensions = reactive({ height: 100, width: 100 });
const currentlyDraggedEgg = ref<null | Egg>(null);

const enableSaveButton = computed(() => {
  return gameData.name && gameData.description && gameData.eggs.length > 0;
});

function placeEggAtPosition(
  e: DragEvent & Partial<{ layerX: number; layerY: number }>
) {
  if (currentlyDraggedEgg.value && e.layerX && e.layerY) {
    currentlyDraggedEgg.value.pos_x = e.layerX;
    currentlyDraggedEgg.value.pos_y = e.layerY;
  }
}

function onSliderChange(egg: Egg) {
  if (imageContainer.value) {
    imageContainer.value.scrollLeft =
      egg.pos_x - imageContainer.value.getBoundingClientRect().width / 2;
    imageContainer.value.scrollTop =
      egg.pos_y - imageContainer.value.getBoundingClientRect().height / 2;
  }
}

function onImageChange(inputElement: HTMLInputElement) {
  image.value = inputElement;

  convertImageToBase64(image.value).then((b64String) => {
    base64image.value = b64String;
  });

  setTimeout(() => {
    imageDimensions.height = gameImage.value?.naturalHeight ?? 100;
    imageDimensions.width = gameImage.value?.naturalWidth ?? 100;
  }, 100);
}

function getEggPosAndSize(egg: Egg) {
  return `top:${egg.pos_y - egg.size}px;left:${egg.pos_x - egg.size}px;width:${
    egg.size * 2
  }px;height:${egg.size * 2}px;`;
}

function removeEgg(index: number) {
  gameData.eggs.splice(index, 1);
}

function addEgg() {
  gameData.eggs.push({
    id: 0,
    gameId: 0,
    pos_x: 50,
    pos_y: 50,
    size: 25,
    description: "",
    hint: "",
  });
}

async function createGame() {
  gameData.image = base64image.value;
  await useFetch("/api/game/create", {
    body: { gameData },
    method: "POST",
  })
    .then((x) => console.log(x))
    .catch((x) => console.log(x));
}
</script>

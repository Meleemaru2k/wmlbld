<template>
  <div>
    <div
      v-for="(egg, index) in gameData.eggs"
      :key="index"
      class="mb-4 bg-slate-200 max-w-full p-2 rounded-md relative min-h-[28px] border-[rgba(0,0,0,0.2)] border-solid border-[1px]"
    >
      <div class="absolute top-0 right-0">
        <div class="flex flex-row [&_*]:mr-2 items-center">
          <span class="font-bold"
            ><span class="font-normal text-sm"
              >{{
                showEgg.get(index) || showEgg.get(index) === undefined
                  ? ""
                  : shortenedDescriptions[index]
              }}
            </span>
            #{{ index }}</span
          >
          <span
            class="cursor-pointer"
            @click="
              showEgg.set(
                index,
                showEgg.get(index) !== undefined ? !showEgg.get(index) : false
              )
            "
            >➖</span
          >
          <span class="cursor-pointer text-xs" @click="removeEgg(index)"
            >❌</span
          >
        </div>
      </div>
      <div class="[&_*]:mb-2" v-show="showEgg.get(index) ?? true">
        <GenericInputTextarea
          label="Beschreibung"
          v-model="egg.description"
        ></GenericInputTextarea>
        <GenericInputTextarea
          label="Hinweise/Tipps"
          v-model="egg.hint"
        ></GenericInputTextarea>
        <div
          class="flex flex-row flex-wrap"
          @input="$emit('silderChange', egg)"
        >
          <div class="flex flex-col w-[150px] m-auto">
            <div class="flex flex-row flex-wrap">
              <label class="w-full">Position X: {{ egg.pos_x }}</label>
              <input
                class="w-[140px]"
                type="range"
                v-model="egg.pos_x"
                :max="imageDimensions?.width"
              />
            </div>
            <div class="flex flex-row flex-wrap">
              <label class="w-full">Position Y: {{ egg.pos_y }}</label>
              <input
                class="w-[140px]"
                type="range"
                v-model="egg.pos_y"
                :max="imageDimensions?.height"
              />
            </div>
            <div class="flex flex-row flex-wrap">
              <label class="w-full">Größe: {{ egg.size }}</label
              ><br />
              <input
                class="w-[140px]"
                type="range"
                max="75"
                min="25"
                v-model="egg.size"
              />
            </div>
          </div>
          <!--Preview Image-->
          <div class="min-w-[110px] m-auto">
            <div
              class="mx-auto max-w-[100px] max-h-[100px] overflow-hidden rounded-full border-2 border-slate-500 border-solid shadow-inner shadow-black"
              ref="previewImages"
            >
              <div
                :style="{
                  height: imageDimensions?.height.toString() + 'px',
                  width: imageDimensions?.width.toString() + 'px',
                }"
              >
                <img
                  class="w-full h-full overflow-hidden"
                  :src="gameData.image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <GenericButtonBasic class="w-full" @click="addEgg()"
      >Secret Hinzufügen</GenericButtonBasic
    >
  </div>
</template>

<script setup lang="ts">
const {
  gameData,
  imageDimensions,
  removeEgg,
  addEgg,
  focusOnEgg_pos_x,
  focusOnEgg_pos_y,
} = useGameEditor();

const imagePreviewOffset = 50;

const showEgg = ref(new Map<number, boolean>());
const previewImages = ref([] as Array<HTMLElement>);

const shortenedDescriptions = computed(() => {
  return gameData.eggs.map((egg) => {
    return egg.description?.length > 15
      ? egg.description?.slice(0, 12) + "..."
      : egg.description;
  });
});

watch(gameData.eggs, (newVal) => {
  for (let i = 0; i < newVal.length; i++) {
    setTimeout(() => onEggPositionChange(i), 10);
  }
});

function onEggPositionChange(index: number) {
  try {
    previewImages.value[index].scrollTop =
      gameData.eggs[index].pos_y - imagePreviewOffset;
    previewImages.value[index].scrollLeft =
      gameData.eggs[index].pos_x - imagePreviewOffset;
    focusOnEgg_pos_x.value = gameData.eggs[index].pos_x;
    focusOnEgg_pos_y.value = gameData.eggs[index].pos_y;
  } catch {}
}
</script>

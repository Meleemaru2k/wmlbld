<template>
  <div>
    <div
      v-for="(egg, index) in modelValue"
      :key="index"
      class="mb-4 bg-green-100 max-w-full p-2 rounded-md relative min-h-[28px] border-[rgba(0,0,0,0.2)] border-solid border-[1px]"
    >
      <div class="absolute top-0 right-0">
        <div class="flex flex-row [&_*]:mr-2">
          <span class="font-bold">#{{ index }}</span>
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
          <span @click="$emit('removeEgg', index)">❌</span>
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
          <div class="flex flex-row">
            <div>
              <label>Position X: {{ egg.pos_x }}</label>
              <input
                type="range"
                v-model="egg.pos_x"
                :max="imageDimensions?.width"
              />
            </div>
            <div>
              <label>Position Y: {{ egg.pos_y }}</label>
              <input
                type="range"
                v-model="egg.pos_y"
                :max="imageDimensions?.height"
              />
            </div>
          </div>
          <div class="w-1/2">
            <label>Größe: {{ egg.size }}</label
            ><br />
            <input type="range" max="75" min="25" v-model="egg.size" />
          </div>
          <!--Preview Image-->
          <div class="w-1/2">
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
                <img class="w-full h-full overflow-hidden" :src="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <GenericButtonBasic class="w-full" @click="$emit('addEgg')"
      >Secret Hinzufügen</GenericButtonBasic
    >
  </div>
</template>

<script setup lang="ts">
import { Egg } from "@prisma/client";
import { PropType } from "vue";
const imagePreviewOffset = 50;

const props = defineProps({
  modelValue: { type: Object as PropType<Array<Egg>>, required: true },
  image: String,
  imageDimensions: Object as PropType<{ height: number; width: number }>,
});
defineEmits(["update:modelValue", "silderChange", "removeEgg", "addEgg"]);

const showEgg = ref(new Map<number, boolean>());
const previewImages = ref([] as Array<HTMLElement>);
watch(props.modelValue, (newVal) => {
  for (let i = 0; i < newVal.length; i++) {
    onEggPositionChange(i);
  }
});

function onEggPositionChange(index: number) {
  try {
    previewImages.value[index].scrollTop =
      props.modelValue[index].pos_y - imagePreviewOffset;
    previewImages.value[index].scrollLeft =
      props.modelValue[index].pos_x - imagePreviewOffset;
  } catch {}
}
</script>

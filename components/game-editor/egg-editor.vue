<template>
  <div>
    <div
      v-for="(egg, index) in modelValue"
      :key="index"
      class="mb-4 bg-green-100 p-2 rounded-md relative min-h-[28px] border-[rgba(0,0,0,0.2)] border-solid border-[1px]"
    >
      <div class="absolute top-0 right-0">
        <div class="flex flex-row [&_*]:mr-2">
          <span class="font-bold">{{ index }}</span>
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
          <span @click="removeEgg(index)">❌</span>
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
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-row">
            <div>
              <label>Position X: {{ egg.pos_x }}</label>
              <input type="range" v-model="egg.pos_x" />
            </div>
            <div>
              <label>Position Y: {{ egg.pos_y }}</label>
              <input type="range" v-model="egg.pos_y" />
            </div>
          </div>
          <div class="w-full">
            <label>Größe: {{ egg.size }}</label
            ><br />
            <input type="range" v-model="egg.size" />
          </div>
        </div>
      </div>
    </div>
    <GenericButtonBasic class="w-full">Secret Hinzufügen</GenericButtonBasic>
  </div>
</template>

<script setup lang="ts">
import { Egg } from "@prisma/client";
const props = defineProps({
  modelValue: Array<Egg>,
});
defineEmits(["update:modelValue"]);

const showEgg = ref(new Map<number, boolean>());

function removeEgg(index: number) {
  props.modelValue?.splice(index, 1);
}
</script>

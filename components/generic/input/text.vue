<template>
  <div class="flex flex-col">
    <label v-if="label">{{ label }}</label>
    <input
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @input="
        {
          $emit('update:modelValue', (<any>$event.target)?.value);
          checkInput();
        }
      "
      class="rounded bg-slate-100 text-slate-900 px-2 py-1 shadow-inner border-[1px] border-[rgba(0,0,0,0.2)]"
    />
    <div v-if="labelUnder" class="text-xs ml-auto -mt-2 mr-0">
      {{ labelUnder }}<span class="ml-1">ℹ️</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps([
  "modelValue",
  "label",
  "labelUnder",
  "placeholder",
  "maxChars",
]);
const emit = defineEmits(["update:modelValue"]);

function checkInput() {
  if (props.maxChars && props.modelValue.length > props.maxChars) {
    emit("update:modelValue", props.modelValue.substring(0, props.maxChars));
  }
}
</script>

<template>
  <div class="flex flex-col">
    <label v-if="label">{{ label }}</label>
    <select
      class="rounded bg-slate-100 text-slate-900 px-2 py-1 shadow-inner border-[1px] border-[rgba(0,0,0,0.2)]"
      v-model="selected"
      @change="$emit('update:modelValue', (<any>$event.target)?.value)"
    >
      <option v-for="(option, index) of options" :key="index" :value="index">
        {{ option }}
      </option>
    </select>
    <div v-if="labelUnder" class="text-xs ml-auto -mt-2 mr-0">
      {{ labelUnder }}<span class="ml-1">ℹ️</span>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["modelValue", "options", "label", "labelUnder"]);
defineEmits(["update:modelValue"]);

const selected = ref(props.modelValue);
</script>

<template>
  <div class="flex flex-col">
    <label v-if="label">{{ label }}</label>
    <textarea
      rows="3"
      :value="modelValue"
      @input="$emit('update:modelValue', (<any>$event.target)?.value)"
      class="rounded bg-slate-100 px-2 py-1 shadow-inner border-[1px] border-[rgba(0,0,0,0.2)]"
    ></textarea>
    <div v-if="labelUnder" class="text-xs ml-auto -mt-2 mr-0">
      {{ labelUnder }}<span class="ml-1">ℹ️</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["modelValue", "label", "labelUnder"]);
defineEmits(["update:modelValue"]);
</script>

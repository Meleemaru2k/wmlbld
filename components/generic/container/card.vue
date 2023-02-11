<template>
  <div
    class="flex flex-col bg-orange-500 border-slate-900 border-[1px] border-solid rounded-md h-full relative overflow-hidden"
  >
    <div class="relative overflow-hidden">
      <img
        :src="image.src"
        :alt="image.altText"
        class="w-full h-48 object-cover hover:scale-[5] transition-all rounded-t-md"
      />
      <slot name="imageOverlay" />
    </div>
    <div
      class="p-4 [&_*]:mb-2 [&_*]:text-center border-black border-t-[1px] border-solid relative"
    >
      <div class="font-bold text-xl text-slate-900">
        <slot name="headline" />
      </div>
      <div class="text-sm text-stone-100">
        <slot name="mainContent" />
      </div>
    </div>
    <div class="text-xs text-stone-100 flex absolute right-2 bottom-1">
      <span class="ml-auto"><slot name="bottomSmallInfo" /></span>
    </div>
    <div
      v-if="options?.showShine"
      class="absolute top-[85%] right-[50%] -rotate-[27deg] bg-white w-[200%] h-[200%] opacity-25"
    ></div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  image: {
    type: Object as PropType<{ src: string; altText: string }>,
    required: true,
  },
  options: {
    type: Object as PropType<{ showShine: boolean }>,
    required: false,
  },
});
</script>

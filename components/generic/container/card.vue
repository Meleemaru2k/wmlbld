<template>
  <div
    class="flex flex-col bg-orange-500 border-slate-900 border-[1px] border-solid rounded-md h-full relative overflow-hidden"
  >
    <div class="relative overflow-hidden h-48 shrink-0">
      <img
        :src="image.src"
        :alt="image.altText"
        class="w-full h-full object-cover hover:scale-[5] transition-all rounded-t-md"
      />
      <slot name="imageOverlay" />
    </div>
    <div
      class="p-4 [&_*]:mb-2 [&_*]:text-center grow border-black border-t-[1px] border-solid relative flex flex-col"
    >
      <div class="font-bold text-xl">
        <div class="w-full bg-slate-700 text-white p-[4px] rounded-md">
          <slot name="headline" />
        </div>
      </div>
      <div class="text-sm text-stone-100 grow">
        <slot name="mainContent" />
      </div>
    </div>
    <div class="text-xs text-stone-100 flex absolute right-6 bottom-1">
      <span class="mx-auto"><slot name="bottomSmallInfo" /></span>
    </div>
    <div
      v-if="options?.showShine"
      class="absolute bottom-2 left-2 rounded-full -rotate-[45deg] bg-black w-2 h-2 opacity-20 shadow-inner shadow-black"
    ></div>
    <div
      v-if="options?.showShine"
      class="absolute bottom-2 right-2 rounded-full -rotate-[45deg] bg-black w-2 h-2 opacity-20 shadow-inner shadow-black"
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

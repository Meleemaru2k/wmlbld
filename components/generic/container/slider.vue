<template>
  <div class="relative">
    <div
      class="flex flex-row flex-nowrap overflow-scroll snap-x md:overflow-hidden overscroll-contain mt-sm py-4 gap-x-8 bg-slate-700 slidewrapper w-full relative"
      ref="slidewrapper"
    >
      <div class="!w-[20px] shrink-0"></div>
      <slot />
      <div class="!w-[20px] shrink-0"></div>
    </div>
    <div
      @click="
        {
          scroll(0);
          useSfx().sounds.button_click.pause();
          useSfx().sounds.button_click.play();
        }
      "
      class="pr-2 pl-4 left-0 directionalButton rounded-r-md"
    >
      <div
        :class="{ buttonAnim: buttonAnimations[0] }"
        class="m-auto text-center text-3xl"
      >
        ⬅️
      </div>
    </div>
    <div
      @click="
        {
          scroll(1);
          useSfx().sounds.button_click.pause();
          useSfx().sounds.button_click.play();
        }
      "
      class="pl-2 pr-4 right-0 directionalButton rounded-l-md"
    >
      <div
        :class="{ buttonAnim: buttonAnimations[1] }"
        class="m-auto text-center text-3xl"
      >
        ➡️
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const slidewrapper = ref<HTMLElement>();
const scrollElem = useScroll(slidewrapper);

const { width: sliderWidth } = useElementSize(slidewrapper);
const buttonAnimations = ref([false, false]);
const buttonAnimTime = 200;

function scroll(direction: 0 | 1) {
  buttonAnimations.value[direction] = true;
  setTimeout(() => {
    buttonAnimations.value[direction] = false;
  }, buttonAnimTime);
  if (direction === 0) {
    slidewrapper.value?.scroll({
      left: scrollElem.x.value - sliderWidth.value,
      behavior: "smooth",
    });
  } else {
    slidewrapper.value?.scroll({
      left: scrollElem.x.value + sliderWidth.value,
      behavior: "smooth",
    });
  }
}
</script>
<style scoped lang="postcss">
:slotted(.slidewrapper > *) {
  @apply snap-center w-9/12 md:w-1/3 lg:w-1/4 xl:w-1/5 shrink-0 grow-0 py-2;
}

.directionalButton {
  @apply absolute py-2 cursor-pointer bg-slate-900 bottom-1/2 -translate-y-1/2 shadow-lg shadow-slate-900;
}
.buttonAnim {
  animation: buttonAnim v-bind(buttonAnimTime + "ms") ease-in-out infinite;
}

@keyframes buttonAnim {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>

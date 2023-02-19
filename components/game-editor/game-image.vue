<template>
  <div
    v-if="gameData.image && imageDimensions"
    v-dragscroll:hidden
    ref="imageContainer"
    class="absolute w-full h-full overflow-hidden overscroll-contain rounded-md"
  >
    <div
      @mousedown="onMouseDown"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
      @mouseup="onMouseUp"
      @touchmove="onTouchMove"
      @mousemove="onMouseMove"
      @drop="moveEggToPosition($event)"
      @dragover.prevent
      @dragenter.prevent
      @contextmenu.prevent
      :style="{
        height: imageDimensions.height.toString() + 'px',
        width: imageDimensions.width.toString() + 'px',
      }"
      class="relative"
    >
      <TransitionGroup name="fade">
        <div
          @drop.stop
          @mousedown.stop
          @touchstart.stop
          v-for="(egg, index) in gameData.eggs"
          :key="index"
          class="absolute rounded-full cursor-pointer text-stone-200 bg-slate-700 border-dotted border-stone-200 border-2"
          :style="getEggPosAndSize(egg)"
        >
          <div
            class="w-full h-full relative select-auto"
            draggable
            @dragstart="currentlyDraggedEgg = egg"
          ></div>
          <div
            @click="removeEgg(index)"
            class="absolute text-xs -right-4 top-1/4 p-1 bg-white rounded-full select-none border-slate-400 border-[1px] -translate-y-1/2 translate-x-1/2"
          >
            ❌
          </div>
          <div
            class="absolute left-1/2 top-1/2 p-1 text-2xl font-bold select-none pointer-events-none -translate-x-1/2 -translate-y-1/2"
          >
            #{{ index }}
          </div>
        </div>
      </TransitionGroup>
      <img
        ref="gameImage"
        draggable="false"
        :src="gameData.image"
        class="select-none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Egg } from ".prisma/client";
import useGameEditor from "~~/components/game-editor/composables/useGameEditor";

const {
  gameData,
  imageDimensions,
  removeEgg,
  addEgg,
  focusOnEgg_pos_x,
  focusOnEgg_pos_y,
} = useGameEditor();

const imageContainer = ref<HTMLElement | null>(null);
const gameImage = ref<HTMLImageElement | null>(null);
const currentlyDraggedEgg = ref<null | Egg>(null);

const {
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onTouchMove,
  onTouchStart,
  onTouchEnd,
} = useCustomLongPress((e) => {
  const event = e as any;
  if (event.touches?.length > 0) {
    const rect = event.target.getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left - event.target.scrollLeft;
    const y = event.touches[0].clientY - rect.top - event.target.scrollTop;
    addEgg({ x: x ?? 50, y: y ?? 50 });
  } else {
    addEgg({ x: event.layerX ?? 50, y: event.layerY ?? 50 });
  }
});

watch(gameImage, (oldVal, newVal) => {
  if (oldVal !== newVal) {
    setTimeout(() => {
      gameImage.value ? onImageChange(gameImage.value) : null;
    }, 0);
  }
});

watch([focusOnEgg_pos_x, focusOnEgg_pos_y], ([newVal_x, newVal_y]) => {
  onFocusChange(newVal_x, newVal_y);
});

function onFocusChange(pos_x: number, pos_y: number) {
  if (imageContainer.value) {
    const x = pos_x - imageContainer.value.getBoundingClientRect().width / 2;
    const y = pos_y - imageContainer.value.getBoundingClientRect().height / 2;
    imageContainer.value.scrollTo({
      top: y,
      left: x,
      behavior: "smooth",
    });
  }
}

function onImageChange(image: HTMLImageElement) {
  setTimeout(() => {
    imageDimensions.height = image.naturalHeight ?? 100;
    imageDimensions.width = image.naturalWidth ?? 100;
  }, 100);
}

function getEggPosAndSize(egg: Egg) {
  return `top:${egg.pos_y - egg.size}px;left:${egg.pos_x - egg.size}px;width:${
    egg.size * 2
  }px;height:${egg.size * 2}px;`;
}

function moveEggToPosition(
  e: DragEvent & Partial<{ layerX: number; layerY: number }>
) {
  if (currentlyDraggedEgg.value && e.layerX && e.layerY) {
    currentlyDraggedEgg.value.pos_x = e.layerX;
    currentlyDraggedEgg.value.pos_y = e.layerY;
  }
}
</script>
<style scoped lang="postcss">
.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-500 ease-in-out;
}

.fade-enter-to {
  opacity: 1;
  scale: 1;
}

.fade-enter-from {
  opacity: 0.5;
  scale: 1.5;
}
.fade-leave-to {
  opacity: 0;
  scale: 0.5;
}
</style>

<template>
  <div
    class="flex flex-col bg-opacity-25"
    style="background: url(/images/paper.jpg)"
  >
    <div
      class="bg-slate-900 text-stone-100 px-8 py-4 flex flex-row items-baseline gap-x-4 overflow-auto"
    >
      <div class="shrink-0">
        <span class="text-xl">⌛</span>
        <span class="font-bold text-xl"
          >{{
            (((timeStarted.getTime() - timestamp) * -1) / 1000).toFixed(2)
          }}s</span
        >
      </div>
      <div class="shrink-0 flex flex-row flex-nowrap">
        <span class="text-xl">ℹ️ Info</span>
      </div>

      <basicButton class="shrink-0" @click="toggleGrid()"
        >Raster <i>A</i></basicButton
      >
    </div>
    <div
      class="p-4 md:p-8 shadow-inner grow flex flex-col bg-opacity-50 bg-stone-300"
    >
      <imageGridVue
        @gamewon="gamewon = true"
        v-if="gamewon === false"
        :game-name="gameName"
        :show-grid="showGrid"
      ></imageGridVue>
      <div v-else>You win</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import imageGridVue from "~~/components/gameboard/image-grid.vue";
import basicButton from "~~/components/generic/button/basic.vue";

const gameName = <string>useRoute().params.name ?? "samplegame";
const gamewon = ref(false);
const showGrid = ref(false);

const timeStarted = new Date();
const { timestamp, pause, resume } = useTimestamp({ controls: true });

function toggleGrid() {
  showGrid.value = !showGrid.value;
}
</script>

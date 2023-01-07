<template>
  <div class="">
    <div class="bg-slate-900 text-stone-100 px-8 py-4 flex flex-row gap-x-4">
      <div>Timer: 101010101</div>
      <div>Raster</div>
    </div>
    <div class="p-8 bg-pink-200 shadow-inner">
      <imageGridVue
        @gamewon="gamewon = true"
        v-if="gamewon === false"
        :game-name="gameName"
      ></imageGridVue>
      <div v-else>You win</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import imageGridVue from "~~/components/gameboard/image-grid.vue";
const gameName = <string>useRoute().params.name ?? "samplegame";
const gamewon = ref(false);
</script>

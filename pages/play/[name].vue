<template>
  <div>Game</div>
  <imageGridVue :game-name="gameName"></imageGridVue>
</template>
<script setup lang="ts">
import imageGridVue from "~~/components/gameboard/image-grid.vue";
const gameName = <string>useRoute().params.name ?? "samplegame";
</script>

<template>
  <div class="flex flex-row justify-center text-center">
    <GenericContainerModal>
      <h1>Gewonnen!</h1>
      <div>⌛ Abschlusszeit ⌛</div>
      <div class="font-bold">{{ playtimeInSeconds }} Sekunden</div>
      <div class="mt-4">
        <GenericButtonBasic
          class="text-xl"
          @click="saveHighscore"
          theme="success"
          >Bestzeit speichern</GenericButtonBasic
        >
      </div>
    </GenericContainerModal>
  </div>
</template>

<script setup lang="ts">
import { GameWithEggs } from "~~/types/game";

const props = defineProps({
  playtimeInSeconds: { type: String, required: true },
  game: { type: Object as PropType<GameWithEggs>, required: true },
});

function saveHighscore() {
  console.log("Saving highscore");
}
</script>

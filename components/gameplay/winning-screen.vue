<template>
  <div class="flex flex-row justify-center text-center">
    <GenericContainerModal>
      <h1>Gewonnen!</h1>
      <div>⌛ Abschlusszeit ⌛</div>
      <div class="font-bold">{{ playtimeInSeconds }} Sekunden</div>
      <div class="mt-4">
        <GenericButtonBasic
          class="text-xl"
          @click="submit()"
          :loading="loading"
          theme="success"
          >Bestzeit speichern</GenericButtonBasic
        >
        <GenericStatusErrorMsg v-if="error">
          {{ error }}
        </GenericStatusErrorMsg>
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

const loading = ref(false);
const { execute: submitScore, error } = await useFetch(
  "/api/game/score/submit",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      score: parseInt(props.playtimeInSeconds),
      gameId: props.game.id,
    },
    immediate: false,
  }
);

async function submit() {
  loading.value = true;
  await submitScore()
    .then(async () => {
      if (!error.value) await navigateTo("/dashboard");
    })
    .catch((e) => {})
    .finally(() => (loading.value = false));
}
</script>

<template>
  <NuxtLayout>
    <LoaderPageDefault v-show="loading" />
    <NuxtLoadingIndicator />
    <NuxtPage class="grow h-full" />
  </NuxtLayout>
</template>
<script setup lang="ts">
const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>
<style lang="postcss">
body {
  @apply font-texty;
}
</style>

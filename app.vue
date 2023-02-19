<template>
  <NuxtLayout>
    <NuxtPage class="grow h-full" />
  </NuxtLayout>
</template>
<style lang="postcss">
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.2rem);
}
body {
  @apply font-texty;
}
</style>

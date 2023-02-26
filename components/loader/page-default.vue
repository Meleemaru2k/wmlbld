<template>
  <div class="fixed left-0 top-0 h-full w-full z-50 bg-black bg-opacity-75">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div style="font-size: 98px" class="loader">🤔</div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.loader {
  text-shadow: 0 0 5px #000000, 0 0 10px #cd2cd3, 0 0 15px #ffffff,
    0 0 20px #0b07ff;
  animation: loaderwobble 1s linear infinite;
}

@keyframes loaderwobble {
  0% {
    scale: 1;
  }
  50% {
    scale: 1.1;
    rotate: 3deg;
  }
  100% {
    scale: 1;
  }
}
</style>

<template>
  <div class="rainbowborder">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.rainbowborder {
  @apply p-1 rainbow-gradient w-full h-full;
  animation: movebg 2.5s linear infinite;
}

.rainbow-gradient {
  background-size: 200%;
  background-image: linear-gradient(
    90deg,
    #00c0ff 0%,
    #ffcf00 49%,
    #fc4f4f 80%,
    #00c0ff 100%
  );
}

@keyframes movebg {
  0% {
    background-position: 200%;
  }

  100% {
    background-position: 0%;
  }
}
</style>

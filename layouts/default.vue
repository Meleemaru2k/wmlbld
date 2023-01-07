<template>
  <div class="relative flex flex-col w-full h-full">
    <div class="bg-slate-700 py-2 px-6 text-stone-100">Layout</div>
    <slot />
    <div class="bg-slate-700 py-2 px-6 text-stone-100 sticky bottom-0">
      Footer
    </div>
  </div>
</template>

<style scoped lang="pcss"></style>

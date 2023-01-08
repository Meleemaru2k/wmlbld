<template>
  <div class="relative flex flex-col w-full h-full">
    <div
      class="bg-slate-700 py-2 px-6 h-16 text-stone-100 flex flex-row flex-nowrap items-center [&_>*]:mr-4"
    >
      <div>
        <img class="w-12 h-12 rounded" src="~/assets/images/logo/output2.jpg" />
      </div>
      <div v-if="status === 'authenticated'">
        <NuxtLink to="/signup">Dashboard</NuxtLink>
      </div>
      <div class="ml-auto"></div>
      <div v-if="status !== 'authenticated'">
        <NuxtLink to="/login">Login</NuxtLink>
      </div>
      <div v-if="status !== 'authenticated'">
        <NuxtLink to="/signup">Account erstellen</NuxtLink>
      </div>
      <div v-if="status === 'authenticated'"><logoutButton /></div>
    </div>
    <slot />
    <div class="bg-slate-700 py-2 px-6 text-stone-100 sticky bottom-0">
      Footer
    </div>
  </div>
</template>
<script setup lang="ts">
import logoutButton from "~/components/account/logut-button.vue";
const { status, data } = useSession();
</script>
<style scoped lang="pcss"></style>

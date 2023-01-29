<template>
  <div class="relative flex flex-col w-full h-full">
    <div
      class="bg-slate-700 py-2 px-6 h-16 text-stone-100 flex flex-row flex-nowrap items-center [&_>*]:mr-4 z-40"
    >
      <NuxtLink to="/"
        ><img class="w-12 h-12 rounded" src="~/assets/images/logo/output2.jpg"
      /></NuxtLink>

      <div class="[&_*]:mr-4" v-if="status === 'authenticated'">
        <NuxtLink
          :class="{ 'font-bold': $route.path === '/dashboard' }"
          to="/dashboard"
          >Dashboard@{{ data?.user?.name }}</NuxtLink
        >
        <NuxtLink
          :class="{ 'font-bold': $route.path.startsWith('/play') }"
          to="/dashboard"
          >Spielen 🕹️</NuxtLink
        >
        <NuxtLink
          :class="{ 'font-bold': $route.path === '/dashboard/create-game' }"
          to="/dashboard/create-game"
          >Spiel erstellen</NuxtLink
        >
        <NuxtLink
          :class="{ 'font-bold': $route.path === '/dashboard/my-games' }"
          to="/dashboard/my-games"
          >Meine Spiele</NuxtLink
        >
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
    <div
      :style="useBackgroundImage()"
      class="grow"
      style="background-repeat: repeat; background-size: 100%"
    >
      <div class="bg-opacity-80 bg-stone-300 h-full">
        <slot class="h-full" />
      </div>
    </div>
    <div class="bg-slate-700 py-2 px-6 text-stone-100 sticky bottom-0 z-40">
      Footer
    </div>
  </div>
</template>
<script setup lang="ts">
import logoutButton from "~/components/account/logut-button.vue";
const { status, data } = useSession();
</script>
<style scoped lang="pcss"></style>

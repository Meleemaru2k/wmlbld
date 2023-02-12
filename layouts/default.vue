<template>
  <div class="relative flex flex-col w-full h-full max-h-[100vh]">
    <div
      class="bg-slate-700 py-2 h-[64px] min-h-[64px] px-6 text-stone-100 flex flex-row flex-nowrap items-center [&_>*]:mr-4 z-40 overflow-x-auto overflow-y-hidden"
    >
      <div
        class="[&_>*]:mr-4 [&_*]:font-bold [&_*]:leading-tight flex flex-row flex-nowrap items-center link-container"
        v-if="status === 'authenticated'"
      >
        <!--<NuxtLink to="/"
          ><img
            class="w-12 h-12 rounded"
            src="~/assets/images/logo/output2.jpg"
        /></NuxtLink>-->
        <div><MusicPlayer></MusicPlayer></div>
        <NuxtLink
          :class="{ 'active-link': $route.path.includes('play-games') }"
          to="/dashboard/play-games"
          >Spielen 🕹️</NuxtLink
        >
        <NuxtLink
          :class="{ 'active-link': $route.path === '/dashboard/create-game' }"
          to="/dashboard/create-game"
          >Spiel erstellen</NuxtLink
        >
        <NuxtLink
          :class="{ 'active-link': $route.path === '/dashboard/my-games' }"
          to="/dashboard/my-games"
          >Meine Spiele</NuxtLink
        >
        <NuxtLink
          :class="{ 'active-link': $route.path === '/dashboard/my-ranks' }"
          to="/dashboard/my-ranks"
          >Meine Bestenlisteplätze</NuxtLink
        >
        <div class="ml-auto"></div>
        <div v-if="status !== 'authenticated'">
          <NuxtLink to="/login">Login</NuxtLink>
        </div>
        <div v-if="status !== 'authenticated'">
          <NuxtLink to="/signup">Account erstellen</NuxtLink>
        </div>
        <div class="shrink-0" v-if="status === 'authenticated'">
          <NuxtLink to="/dashboard/my-games">Mein Profil 🥸</NuxtLink>
        </div>
        <div class="shrink-0" v-if="status === 'authenticated'">
          <logoutButton />
        </div>
      </div>
      <div
        class="[&_*]:mr-4 flex flex-row flex-nowrap items-center link-container"
        v-else
      >
        <NuxtLink to="/"
          ><img
            class="w-12 h-12 rounded"
            src="~/assets/images/logo/output2.jpg"
        /></NuxtLink>

        <div class="ml-auto"></div>
        <div>
          <NuxtLink to="/login">Login</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/signup">Account erstellen</NuxtLink>
        </div>
      </div>
    </div>
    <div
      :style="useBackgroundImage()"
      class="grow movebg"
      style="background-repeat: repeat; background-size: 100%"
    >
      <div class="bg-opacity-90 bg-blue-800 h-full">
        <slot class="h-full" />
      </div>
    </div>
    <div class="bg-slate-700 py-2 px-6 text-stone-100 bottom-0 z-40">
      Footer
    </div>
  </div>
</template>
<script setup lang="ts">
import logoutButton from "~/components/account/logut-button.vue";
const { status, data } = useSession();
</script>
<style scoped lang="pcss">
.link-container{
  @apply w-full;
  & > *{
    @apply hover:scale-110 transition-all shrink-0;
    &:hover{
      text-shadow: 0px 0px 2px rgba(0,0,0), 0px 0px 2px rgba(220,220,200);
    }
  }
}

.movebg {
  animation: movebg 33s linear infinite alternate;
}
.active-link{
  @apply font-bold text-orange-300;
}

@keyframes movebg {
  to {
    background-position: 200%;
  }
}
</style>

<template>
  <div class="relative flex flex-col w-full h-full max-h-[100vh]">
    <div
      class="bg-slate-700 py-2 h-[64px] min-h-[64px] px-6 text-stone-100 flex flex-row flex-nowrap items-center [&_>*]:mr-4 z-40 overflow-x-auto overflow-y-hidden"
    >
      <div
        class="[&_>*]:mr-4 w-full flex flex-row flex-nowrap items-center link-container justify-start md:justify-center"
        v-if="status === 'authenticated'"
      >
        <GenericButtonMenu
          tabindex="-1"
          :is-active="$route.path.includes('play-games')"
        >
          <NuxtLink to="/dashboard/play-games">🔍<br /></NuxtLink>
        </GenericButtonMenu>

        <GenericButtonMenu
          tabindex="-1"
          :is-active="$route.path.includes('/dashboard/my-games')"
        >
          <NuxtLink to="/dashboard/my-games">📚</NuxtLink>
        </GenericButtonMenu>
        <GenericButtonMenu
          tabindex="-1"
          :is-active="$route.path.includes('/dashboard/my-ranks')"
        >
          <NuxtLink to="/dashboard/my-ranks">🏅</NuxtLink></GenericButtonMenu
        >
        <GenericButtonMenu
          tabindex="-1"
          :is-active="$route.path.includes('/dashboard/create-game')"
        >
          <NuxtLink to="/dashboard/create-game">✍️</NuxtLink>
        </GenericButtonMenu>
        <div class="shrink-0">
          <GenericButtonMenu tabindex="-1">
            <NuxtLink to="/dashboard/my-profile">🥸</NuxtLink>
          </GenericButtonMenu>
        </div>
        <div><MusicPlayer></MusicPlayer></div>
        <div class="shrink-0 !text-base">
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
            src="~/assets/images/logo/owimpic_3.jpg"
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
    <GenericContainerStyleNeonBorder>
      <div class="bg-slate-900 pt-8 px-6 text-stone-100 bottom-0 z-40 relative">
        <div class="absolute right-2 top-2 text-xs ml-auto text-slate-600">
          Danke für's spielen ❤️ {{ data?.user?.name }}
        </div>
      </div>
    </GenericContainerStyleNeonBorder>
  </div>
</template>
<script setup lang="ts">
import logoutButton from "~/components/account/logut-button.vue";
const { status, data } = useSession();
</script>
<style scoped lang="pcss">

.movebg {
  animation: movebg 33s linear infinite alternate;
}

@keyframes movebg {
  to {
    background-position: 200%;
  }
}
</style>

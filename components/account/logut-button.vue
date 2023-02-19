<template>
  <GenericButtonBasic
    :disabled="isLoading"
    :loading="isLoading"
    @click="logoutUser()"
    theme="primary"
    class="relative"
    ><span>👋 Logout &#8205; </span>
  </GenericButtonBasic>
</template>
<script setup lang="ts">
const { signOut, getSession } = useSession();
const username = (await getSession())?.user?.name;
const isLoading = ref(false);

async function logoutUser() {
  isLoading.value = true;
  await signOut({ callbackUrl: "/login" });
  isLoading.value = false;
}
</script>

<template>
  <GenericButtonBasic
    :disabled="isLoading"
    :loading="isLoading"
    @click="logoutUser()"
    theme="primary"
    >👋 Logout</GenericButtonBasic
  >
</template>
<script setup lang="ts">
const { signOut } = useSession();
const isLoading = ref(false);

async function logoutUser() {
  isLoading.value = true;
  await signOut({ callbackUrl: "/login" });
  isLoading.value = false;
}
</script>

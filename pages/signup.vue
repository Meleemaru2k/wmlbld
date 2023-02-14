<template>
  <div class="flex flex-col">
    <GenericContainerModal class="w-[350px]">
      <div class="text-2xl font-bold font-mono mb-4">Account anlegen</div>
      <div class="[&_*]:mb-2 flex flex-col">
        <inputText v-model="loginData.name" label="👽 Nickname" />
        <inputText v-model="loginData.email" label="📧 E-Mail" />
        <inputText
          v-model="loginData.password"
          label="🔐 Passwort"
          label-under="mindestens 10 Zeichen"
        />

        <GenericStatusErrorMsg v-if="errorMessage">
          {{ errorMessage }}
        </GenericStatusErrorMsg>
        <GenericButtonBasic
          :disabled="isLoading"
          :loading="isLoading"
          @click="signUp()"
          class="mt-4"
          >Absenden</GenericButtonBasic
        >
      </div>
    </GenericContainerModal>
    <div class="mb-32"></div>
  </div>
</template>
<script setup lang="ts">
import inputText from "~/components/generic/input/text.vue";

const loginData = reactive({ name: "", email: "", password: "" });
const isLoading = ref(false);
const errorMessage = ref<string>("");

async function signUp() {
  isLoading.value = true;
  await $fetch("/api/user/signup", {
    method: "POST",
    body: loginData,
    onRequestError({ error }) {
      errorMessage.value = error.message;
    },
    onResponseError({ response }) {
      errorMessage.value = response._data.message;
    },
    onResponse({ response }) {
      if (response.ok) {
        navigateTo("/login");
      }
    },
  }).catch(() => {});
  isLoading.value = false;
}
</script>

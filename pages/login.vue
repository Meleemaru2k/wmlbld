<template>
  <div class="bg-slate-200 flex flex-col">
    <div
      class="m-auto flex flex-col w-[350px] rounded shadow-inner bg-white border-[rgba(0,0,0,0.2)] border-solid border-[1px] p-4"
    >
      <div class="text-2xl font-bold font-mono mb-4">Login</div>
      <div class="[&_*]:mb-2 flex flex-col">
        <inputText v-model="loginData.email" label="📧 E-Mail" />
        <inputText
          v-model="loginData.password"
          label="🔐 Passwort"
          label-under="mindestens 10 Zeichen"
        />
        <div
          v-if="errorMessage"
          class="font-bold text-slate-100 text-center bg-red-500 px-4 py-2"
        >
          ⚠️<br />
          {{ errorMessage }}
        </div>
        <GenericButtonBasic
          :disabled="isLoading"
          :loading="isLoading"
          @click="sin()"
          class="mt-4"
          >Anmelden</GenericButtonBasic
        >
      </div>
      s:{{ status }} d:{{ data }}
    </div>
  </div>
</template>
<script setup lang="ts">
import inputText from "~/components/generic/input/text.vue";
definePageMeta({ auth: false });
const loginData = reactive({ email: "", password: "" });
const isLoading = ref(false);
const errorMessage = ref<string>("");
const { status, data, signIn, signOut } = useSession();

async function sin() {
  await signIn("credentials", {
    username: loginData.email,
    password: loginData.password,
    redirect: false,
  });
}

async function login() {
  isLoading.value = true;
  await $fetch("/api/user/login", {
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
        navigateTo("/dashboard");
      }
    },
  }).catch(() => {});
  isLoading.value = false;
}
</script>

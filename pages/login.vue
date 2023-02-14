<template>
  <div class="flex flex-col">
    <GenericContainerModal class="w-[350px]">
      <div class="text-2xl font-bold font-mono mb-4">Login</div>
      <div class="[&_*]:mb-2 flex flex-col">
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
          @click="login()"
          class="mt-4"
          >Anmelden</GenericButtonBasic
        >
      </div>
    </GenericContainerModal>

    <div class="mb-32"></div>
  </div>
</template>
<script setup lang="ts">
import inputText from "~/components/generic/input/text.vue";
definePageMeta({ auth: false });
const loginData = reactive({ email: "", password: "" });
const isLoading = ref(false);
const errorMessage = ref<string>("");
const { signIn } = useSession();

async function login() {
  await signIn("credentials", {
    username: loginData.email,
    password: loginData.password,
    redirect: false,
  }).then((response) => {
    if (response.error) {
      errorMessage.value = "Login-Daten nicht korrekt";
    } else {
      navigateTo("/dashboard");
    }
  });
}
</script>

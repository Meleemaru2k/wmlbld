// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ["@/assets/css/style.css", "@/assets/css/tailwind.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
  ],
  auth: { origin: process.env.AUTH_ORIGIN },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});

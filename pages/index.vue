<template>
  <div class="flex flex-col">
    <div class="m-auto w-[350px] rounded relative">
      <GenericContainerStyleItemSelectFunky>
        <GenericContainerStyleRainbowBorder class="rounded">
          <GenericContainerModal>
            <div class="text-3xl font-bold text-center mb-4">Owimpic</div>
            <div class="w-40 h-40 mx-auto mb-4">
              <NuxtLink to="/login">
                <img
                  class="rounded border border-solid border-slate-400 transition-all"
                  src="~/assets/images/logo/owimpic_3.jpg"
                />
              </NuxtLink>
            </div>
            <div class="text-center">
              Wimmelbild-Spiel <br /><span class="text-xs"
                >Mit ❤️ gemacht
              </span>
            </div>
          </GenericContainerModal>
        </GenericContainerStyleRainbowBorder>
      </GenericContainerStyleItemSelectFunky>
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemSelectFunky from "~~/components/generic/container/style/item-select-funky.vue";

/**
 * Welcome & Login/Signup
 */
</script>

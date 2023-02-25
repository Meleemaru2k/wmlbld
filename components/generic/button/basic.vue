<template>
  <button
    class="additional-styles overflow-hidden rounded transition-all relative border-solid border-[rgba(0,0,0,0.2)] border-[1px] px-3 py-1 text-center"
    :class="[
      theme,
      { loading__all: loading },
      {
        'saturate-0': disabled,
        'brightness-75': disabled,
        'cursor-not-allowed': disabled,
      },
    ]"
    :disabled="disabled"
    @click="clickHandler"
    @mouseleave="(<any>$event?.target)?.blur()"
  >
    <div
      v-show="loading"
      class="flex flex-col items-center h-full w-full bg-[rgba(0,0,0,0.66)] absolute left-0 top-0"
    >
      <span
        class="absolute top-1/2 -translate-y-1/2 loading__cloud items-center text-2xl"
        >🤔</span
      >
    </div>
    <span :style="loading ? 'color:rgba(0,0,0,0)' : ''">
      <slot /> <span v-if="confirmClick" class="text-xs">🖱️x2</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  theme: {
    type: String as PropType<
      "primary" | "secondary" | "success" | "error" | "warning"
    >,
    required: false,
    default: "primary",
  },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  confirmClick: { type: Boolean, default: false },
});
const doubleClick = useDoubleClick();

function clickHandler() {
  useSfx().sounds(SFX.button_click).play();
  doubleClick?.clickHandler();
  if (!props.confirmClick || doubleClick?.isDoubleClick?.value) {
    emit("click");
  }
}

const emit = defineEmits<{
  (event: "click"): void;
}>();
</script>

<style scoped lang="pcss">
.primary {
  @apply bg-blue-500 text-slate-100;
}

.secondary {
  @apply bg-slate-500 text-slate-100;
}

.success {
  @apply bg-green-500 text-slate-100;
}

.warning {
  @apply bg-yellow-500 text-slate-100;
}

.error {
  @apply bg-red-500 text-slate-100;
}

.additional-styles {
  &:hover {
    &:before {
      content: "";
      @apply top-[95%] transition-all ease-in-out duration-200 bg-[rgba(255,255,255,0.3)];
    }
  }

  &:before {
    content: "";
    @apply block left-0 w-full h-8 -top-36 absolute bg-[rgba(255,255,255,0.10)] transition-none;
  }

  &:after {
    content: "";
    position: absolute;
    top: calc(100% - 2px);
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(0, 0, 0, 0.2);
  }
  &:focus {
    box-shadow: inset -2px 2px 2px rgba(255,255,255,0.3), inset 2px -2px 2px rgba(255,255,255,0.3);
  }
}

.loading__all {
  animation: loading linear 0.5s infinite alternate;
  text-shadow: 0 0 0.5em #ffffff, 0 0 1em #000000;
}
.loading__cloud {
  animation: loading__cloud linear 1s infinite alternate;
  transform-origin: center;
  text-shadow: 0 0 1px #000000, 0 0 4px #000000, 0 0 5px #FFFFFF;
}

@keyframes loading__cloud {
  0% {
    scale: 1;
  }
  50% {
    scale: 1.1;
  }
  100% {
    scale: 1;
  }
}
@keyframes loading {
  0% {
    filter: brightness(0.9);
    -webkit-filter: brightness(0.9);
  }
  100% {
    filter: brightness(1.1);
    -webkit-filter: brightness(1.1);
  }
}
</style>

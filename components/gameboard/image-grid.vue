<template>
  <div>
    <div class="hidden">
      <img class="hidden" ref="baseimg" src="~/assets/sample-img.jpg" />
    </div>
    <div
      v-if="grid.height !== 0"
      class="flex flex-col w-full relative p-2 bg-black"
      :style="`height: ${grid.height}px; width: ${grid.width}px;`"
    >
      <div
        class="flex flex-row flex-nowrap"
        v-for="row in grid.rows"
        :key="row"
        :style="{ height: `${100 / grid.rows}%` }"
      >
        <div
          :style="{ width: `${100 / grid.columns}%` }"
          v-for="column in grid.columns"
          :key="column"
          class="border-r-2 border-t-2 border-dashed border-black relative"
        >
          <img
            src="~/assets/sample-img.jpg"
            class="object-none"
            :style="
              getImagePostionForTile(
                row,
                column,
                grid.rows,
                grid.columns,
                grid.height,
                grid.width
              )
            "
          />
          <TileIndicator :row="row" :column="column" />
        </div>
      </div>
      <div
        class="w-full h-full absolute top-0 left-0"
        @click="handleGridClick($event)"
      ></div>
      <div
        v-for="(foundField, index) in foundFields"
        :key="index"
        class="absolute w-8 h-8 bg-green-500 rounded-full text-center border-solid border-green-900 border-2"
        :style="`top: ${foundField.y}px; left: ${foundField.x}px`"
      >
        <div
          class="text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          👍🏻
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TileIndicator from "./tile-indicator.vue";
import mockdata from "~/assets/sampe-config.json";

const baseimg = ref<HTMLImageElement>();
const grid = reactive({ height: 0, width: 0, rows: 6, columns: 4 });
const clickfields = getClickFields();
const foundFields = ref<Set<{ x: number; y: number }>>(new Set());

onMounted(() => {
  setTimeout(() => {
    grid.height = baseimg.value?.naturalHeight ?? 100;
    grid.width = baseimg.value?.naturalWidth ?? 100;
  }, 100);
});

function handleGridClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target) {
    return;
  }
  const rect = target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log(x, y);
  console.log(pointIsInBox(x, y));
  const isIn = pointIsInBox(x, y);
  if (isIn) {
    foundFields.value.add(isIn);
  }
}

function getImagePostionForTile(
  row: number,
  column: number,
  rowCount: number,
  columnCount: number,
  height: number,
  width: number
) {
  const tileDimensions = getTileDimension(rowCount, columnCount, height, width);
  const pos_y = -((row - 1) * tileDimensions.height);
  const pos_x = -((column - 1) * tileDimensions.width);
  return `object-position: ${pos_x}px ${pos_y}px`;
}

function getTileDimension(
  rows: number,
  columns: number,
  height: number,
  width: number
) {
  return { height: height / rows, width: width / columns };
}

function getClickFields() {
  return mockdata.games[0].eggs;
}

function pointIsInBox(x: number, y: number) {
  for (const field of clickfields) {
    if (
      x >= field.x - field.size &&
      x <= field.x + field.size &&
      y >= field.y - field.size &&
      y <= field.y + field.size
    ) {
      return { x: field.x, y: field.y };
    }
  }
  return null;
}
</script>

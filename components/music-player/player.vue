<template>
  <div
    class="w-[100px] bg-slate-700 border-[1px] border-solid border-slate-200 py-[1px] px-[4px] rounded-sm flex flex-col text-xs font-thin overflow-hidden"
  >
    <div
      class="flex text-base flex-row flex-nowrap justify-between [&_*]:cursor-pointer"
    >
      <div @click="prevSong">⏮️</div>
      <div @click="playOrPauseMusic">
        {{ currentSong?.paused ? "⏸️" : "▶️" }}
      </div>
      <div @click="nextSong">⏭️</div>
    </div>
    <div class="w-full h-[0.5px] mt-[4px] bg-slate-400"></div>
    <div class="moveText">
      💿 {{ currentSong?.artist }} - {{ currentSong?.songName }}
    </div>
  </div>
</template>
<script setup lang="ts">
const { currentSong, playSong, pauseSong, resumeSong, songList } = useMusic();
let currentSongId = 0;

function playOrPauseMusic() {
  if (!currentSong.value) {
    useMusic().playSong(songList[currentSongId]);
  } else if (currentSong.value.paused) {
    pauseSong();
  } else {
    resumeSong();
  }
}

function nextSong() {
  if (currentSongId >= songList.length - 1) {
    currentSongId = 0;
  } else {
    currentSongId += 1;
  }
  playSong(songList[currentSongId]);
}

function prevSong() {
  console.log(currentSongId, songList.length - 1);
  if (currentSongId === 0) {
    currentSongId = songList.length - 1;
  } else {
    currentSongId -= 1;
  }
  playSong(songList[currentSongId]);
}

watch(
  currentSong,
  (val) => {
    if (val?.ended && val.paused) {
      nextSong();
    }
  },
  { deep: true }
);
</script>
<style scoped lang="postcss">
.moveText {
  @apply whitespace-nowrap overflow-hidden w-fit text-xs;
  animation: moveText 15s linear infinite;
}
@keyframes moveText {
  0% {
    transform: translateX(120%);
  }
  100% {
    transform: translateX(-120%);
  }
}
</style>

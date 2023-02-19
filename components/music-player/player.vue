<template>
  <div
    class="w-[100px] bg-slate-900 border-[1px] border-solid border-slate-400 py-[1px] px-[4px] rounded-sm flex flex-col text-xs font-thin overflow-hidden shadow-sm shadow-black"
  >
    <div
      class="flex text-base flex-row py-[2px] flex-nowrap justify-between [&_*]:cursor-pointer"
    >
      <button @click="prevSong" class="control-button">⏮️</button>
      <button @click="playOrPauseMusic" class="control-button">
        {{ currentSong?.paused ? "⏸️" : "▶️" }}
      </button>
      <button @click="nextSong" class="control-button">⏭️</button>
    </div>
    <div class="w-full h-[0.5px] mt-[4px] bg-slate-400"></div>
    <div class="w-[90px] mr-[5px] justify-self-center overflow-hidden">
      <div class="moveText">
        💿 {{ currentSong?.artist }} - {{ currentSong?.songName }}
      </div>
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
  currentSong.value?.reset();
  if (currentSongId >= songList.length - 1) {
    currentSongId = 0;
  } else {
    currentSongId += 1;
  }
  playSong(songList[currentSongId]);
}

function prevSong() {
  currentSong.value?.reset();
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
    if (val?.ended) {
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

.control-button {
  &:focus {
    animation: click 0.5s ease-in-out;
  }
  &:hover {
    text-shadow: 0 0 0.2rem #fff;
  }
}

@keyframes click {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
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

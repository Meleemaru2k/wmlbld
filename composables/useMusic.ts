import coding_night from "~/assets/music/coding-night_FASSSounds.mp3";
import jazz_cafe from "~/assets/music/jazz-cafe_FASSSounds.mp3";
import abstract_world from "~/assets/music/abstract-world_AlexiAction.mp3";
import seduction_jazz from "~/assets/music/seduction-jazz_FreeGroove.mp3";
export enum Music {
  coding_night = "coding_night",
  jazz_cafe = "jazz_cafe",
  abstract_world = "abstract_world",
  seduction_jazz = "seduction_jazz",
}

const audioMap = reactive(new Map<Music, ReturnType<typeof transformAudio>>());
audioMap.set(
  Music.coding_night,
  transformAudio(new Audio(coding_night), {
    songName: "Coding Night",
    artist: "FASSSounds",
  })
);
audioMap.set(
  Music.jazz_cafe,
  transformAudio(new Audio(jazz_cafe), {
    songName: "Jazz Cafe",
    artist: "FASSSounds",
  })
);
audioMap.set(
  Music.abstract_world,
  transformAudio(new Audio(abstract_world), {
    songName: "Abstract World",
    artist: "AlexiAction",
  })
);
audioMap.set(
  Music.seduction_jazz,
  transformAudio(new Audio(seduction_jazz), {
    songName: "Seduction Jazz",
    artist: "FreeGroove",
  })
);

// Acutal composable
const currentSong = ref<ReturnType<typeof transformAudio>>();
const songList = getSongList();

const useMusic = () => {
  const songs = (music: Music) => {
    return audioMap.get(music) as ReturnType<typeof transformAudio>;
  };
  return { songs, currentSong, playSong, pauseSong, resumeSong, songList };
};

// Control functions
function setCurrentSong(song: Music) {
  currentSong.value = audioMap.get(song);
}

function playSong(song: Music) {
  currentSong.value?.reset();
  currentSong.value?.pause();
  setCurrentSong(song);
  currentSong?.value?.play();
}

function pauseSong() {
  currentSong.value?.pause();
}

function resumeSong() {
  currentSong.value?.resume();
}

//Helper that returns a configured and simplified audio object
function transformAudio(
  audioObject: HTMLAudioElement,
  options?: { volume?: number; songName?: string; artist?: string }
) {
  audioObject.volume = options?.volume ?? 1;
  const aObj = {
    pause: () => {
      audioObject.pause();
    },
    resume: () => audioObject.play(),
    reset: () => {
      audioObject.currentTime = 0;
    },
    play: () => {
      audioObject.pause();
      audioObject.currentTime = 0;
      audioObject.play();
    },
    setLoop: (set: boolean) => (audioObject.loop = set),
    paused: ref(true),
    ended: ref(false),
    songName: options?.songName ?? "unknown",
    artist: options?.artist ?? "unknown",
  };

  /**
   * Dont aske me why it works this way with pause/play.
   * Probably one of those code-pieces you come back to after months
   * and immediately see what you did wrong.
   */
  audioObject.addEventListener("play", () => {
    aObj.ended.value = false;
    aObj.paused.value = true;
  });
  audioObject.addEventListener("pause", () => {
    aObj.paused.value = false;
  });
  audioObject.addEventListener("ended", () => {
    aObj.ended.value = true;
  });

  return aObj;
}

function getSongList() {
  const songs = [];
  for (const song of Object.keys(Music)) {
    songs.push(song);
  }
  return songs as Music[];
}

//

export default useMusic;

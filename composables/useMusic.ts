import coding_night from "~/assets/music/coding_night.mp3";
import jazz_cafe from "~/assets/music/jazz_cafe.mp3";
import techno_loop from "~/assets/music/techno_loop.mp3";

export enum Music {
  coding_night = "coding_night",
  jazz_cafe = "jazz_cafe",
  techno_loop = "techno_loop",
}

const audioMap = reactive(new Map<Music, ReturnType<typeof transformAudio>>());
audioMap.set(
  Music.coding_night,
  transformAudio(new Audio(coding_night), { songName: "Coding Night" })
);
audioMap.set(
  Music.jazz_cafe,
  transformAudio(new Audio(jazz_cafe), { songName: "Jazz Cafe" })
);
audioMap.set(
  Music.techno_loop,
  transformAudio(new Audio(techno_loop), { songName: "Techno Loop" })
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

import egg_found from "~/assets/sounds/egg_found.mp3";
import button_click from "~/assets/sounds/button_click.mp3";
import game_won from "~/assets/sounds/game_won.mp3";
import curtain_roll from "~/assets/sounds/curtain_roll.mp3";
import plopp from "~/assets/sounds/plopp.mp3";

export enum SFX {
  egg_found = "egg_found",
  button_click = "button_click",
  game_won = "game_won",
  curtain_roll = "curtain_roll",
  plopp = "plopp",
}

const audioMap = reactive(new Map<SFX, ReturnType<typeof transformAudio>>());
audioMap.set(
  SFX.egg_found,
  transformAudio(new Audio(egg_found), { volume: 0.9 })
);
audioMap.set(SFX.button_click, transformAudio(new Audio(button_click)));
audioMap.set(
  SFX.game_won,
  transformAudio(new Audio(game_won), { volume: 0.8 })
);
audioMap.set(SFX.curtain_roll, transformAudio(new Audio(curtain_roll)));
audioMap.set(
  SFX.plopp,
  transformAudio(new Audio(plopp), { volume: 0.05, playBackRate: 1 })
);

export const useSfx = () => {
  const sounds = (sfx: SFX) => {
    return audioMap.get(sfx) as ReturnType<typeof transformAudio>;
  };
  return { sounds };
};

//Helper that returns a configured and simplified audio object
function transformAudio(
  audioObject: HTMLAudioElement,
  options?: { volume?: number; playBackRate?: number }
) {
  audioObject.volume = options?.volume ?? 1;
  audioObject.playbackRate = options?.playBackRate ?? 1;
  return {
    pause: () => audioObject.pause(),
    resume: () => audioObject.play(),
    reset: () => (audioObject.currentTime = 0),
    play: () => {
      audioObject.pause();
      audioObject.currentTime = 0;
      audioObject.play();
    },
  };
}

import egg_found from "~/assets/sounds/egg_found.mp3";
import button_click from "~/assets/sounds/button_click.mp3";
import game_won from "~/assets/sounds/game_won.mp3";

export enum SFX {
  egg_found = "egg_found",
  button_click = "button_click",
  game_won = "game_won",
}

const audioMap = reactive(new Map<SFX, ReturnType<typeof transformAudio>>());
audioMap.set(SFX.egg_found, transformAudio(new Audio(egg_found)));
audioMap.set(SFX.button_click, transformAudio(new Audio(button_click)));
audioMap.set(SFX.game_won, transformAudio(new Audio(game_won)));

export const useSfx = () => {
  const sounds = (sfx: SFX) => {
    console.log("object", audioMap.get(sfx));
    return audioMap.get(sfx) as ReturnType<typeof transformAudio>;
  };
  return { sounds };
};

//Helper
function transformAudio(audioObject: HTMLAudioElement) {
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

import egg_found from "~/assets/sounds/egg_found.mp3";
import button_click from "~/assets/sounds/button_click.mp3";
import game_won from "~/assets/sounds/game_won.mp3";

export const sfx = reactive({
  egg_found: new Audio(egg_found),
  button_click: new Audio(button_click),
  game_won: new Audio(game_won),
});

export const useSfx = () => {
  const sounds = sfx;
  return { sounds };
};

import { Egg, Game } from ".prisma/client";
import { GameWithEggs } from "~~/types/game";

type GameState = {
  gameWon: boolean;
  foundEggs: Set<Egg>;
  showGrid: boolean;
};

type GameWithState = {
  game: GameWithEggs;
  state: GameState;
};

const games = reactive(new Map<string, GameWithState>());

export default async function usePlayGame(name?: string) {
  const gameName = name ?? <string>useRoute().params.name ?? "samplegame";

  const storedGame = games.get(gameName);
  if (storedGame) {
    return storedGame;
  }

  //-----

  const { data: gameData } = await useFetch<GameWithEggs>(
    `/api/game/find/name/${gameName}`
  );

  if (!gameData.value) {
    await navigateTo("/dashboard");
  }

  const gameWithState: GameWithState = {
    game: unref(gameData) as GameWithEggs,
    state: {
      gameWon: false,
      foundEggs: new Set(),
      showGrid: false,
    },
  };
  games.set(gameName, gameWithState);

  return games.get(gameName);
}

//function toggleGrid() {
//  showGrid.value = !showGrid.value;
//}

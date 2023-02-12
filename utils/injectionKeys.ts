import { Egg } from ".prisma/client";
import { GameWithEggs } from "~~/types/game";

export type GameState_IK = {
  game: Ref<GameWithEggs>;
  playerReady: Ref<boolean>;
  gameWon: Ref<boolean>;
  foundEggs: Ref<Set<Egg>>;
  showGrid: Ref<boolean>;
  playtimeInSeconds: ComputedRef<string>;
};

export const gameState_IK = Symbol() as InjectionKey<GameState_IK>;

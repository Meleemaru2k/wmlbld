import { Egg, Game, GameUserScore } from "@prisma/client";

export type GameWithEggs = Game & { eggs: Array<Egg> };

export type GameWithEggsScoreAuthor = Game & {
  eggs: Array<Egg>;
  scores: GameUserScore[];
  author: { name: string };
  _count: { scores: number };
};

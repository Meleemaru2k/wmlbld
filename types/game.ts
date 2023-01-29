import { Egg, Game } from "@prisma/client";

export type GameWithEggs = Game & { eggs: Array<Egg> };

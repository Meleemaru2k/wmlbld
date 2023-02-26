import { Game } from "@prisma/client";
import { GameWithEggs } from "~~/types/game";

export class GameValidator {
  static forbiddenGameNames = [
    "create",
    "update",
    "delete",
    "get",
    "list",
    "newest",
    "new",
  ];

  //static validate(game: GameWithEggs): void {}

  static validateWithCleanups(game: GameWithEggs): GameWithEggs {
    this.validateAndCleanup_Game(game);
    this.validateAndCleanup_Eggs(game);
    this.validateImageData(game);
    return game;
  }

  private static validateAndCleanup_Game(game: Game): Game {
    if (game.description && game.description?.length > 254) {
      game.description = game.description.slice(0, 254);
    }
    if (game.name && game.name.length > 254) {
      game.name = game.name.slice(0, 254);
    }
    if (this.forbiddenGameNames.includes(game.name)) {
      game.name = game.name + this.randomIntFromInterval();
    }
    //only allow alphanumeric characters and spaces and umlauts (and similar)
    if (game.name && !game.name.match(/^[a-zA-Z0-9À-ž ]+$/)) {
      game.name = game.name.replace(/[^a-zA-Z0-9À-ž ]/g, "");
    }
    return game;
  }

  private static validateImageData(game: Game): void {
    if (
      game.image &&
      game.image.length > 0 &&
      !game.image.match(/^data:image\/(png|jpg|jpeg);base64,/)
    ) {
      throw createError({
        statusCode: 500,
        statusMessage: "Image is not in base64 format.",
      });
    }
  }

  private static validateAndCleanup_Eggs(game: GameWithEggs): GameWithEggs {
    game.eggs = game.eggs.map((egg: any) => {
      if (egg.hint && egg.hint.length > 254) {
        egg.hint = egg.hint.slice(0, 254);
      }
      if (egg.description && egg.description.length > 254) {
        egg.description = egg.description.slice(0, 254);
      }
      delete egg.gameId;
      delete egg.id;
      egg.pos_x =
        egg.pos_x === typeof "number" ? egg.pos_x : parseInt(egg.pos_x);
      egg.pos_y =
        egg.pos_y === typeof "number" ? egg.pos_y : parseInt(egg.pos_y);
      egg.size = egg.size === typeof "number" ? egg.size : parseInt(egg.size);
      return egg;
    });
    return game;
  }

  private static randomIntFromInterval(
    min: number = 100000,
    max: number = 999999
  ) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

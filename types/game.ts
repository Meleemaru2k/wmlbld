export type GameConfig = {
  game: {
    name: string;
    description: string;
    quests: Array<string>;
    eggs: Array<{ x: number; y: number; size: number }>;
  };
};

export type GameConfig = {
  game: {
    name: string;
    imgUrl: string;
    height: number;
    width: number;
    eggs: Array<{ x: number; y: number; size: number }>;
  };
};

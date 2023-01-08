import internal from "stream";

export type GameConfig = {
  game: {
    id: number;
    name: string;
    authorId: number;
    description?: string;
    image: string;
    eggs: Array<{
      x: number;
      y: number;
      size: number;
      description?: string;
      hint?: string;
    }>;
  };
};

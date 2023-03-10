import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        retro: ["retro", defaultTheme.fontFamily.mono],
        texty: ["texty", defaultTheme.fontFamily.sans],
      },
    },
  },
};

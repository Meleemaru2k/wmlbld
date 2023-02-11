import { Egg } from ".prisma/client";
/**
 * @Info
 * Could also make this per gameId, or with a pinia store.
 * However, this is a simple solution for now as users can only edit one game at a time.
 */

const gameData = reactive({
  name: "Spiel Name",
  authorId: 1,
  passphrase: "Passwort",
  description: "Eine Beschreibung des Spiels",
  image: "",
  eggs: [] as Array<Egg>,
});

const imageDimensions = reactive({ height: 100, width: 100 });

function removeEgg(index: number) {
  gameData.eggs.splice(index, 1);
}

function addEgg(position?: { x: number; y: number }) {
  gameData.eggs.push({
    id: 0,
    gameId: 0,
    pos_x: position?.x ?? 50,
    pos_y: position?.y ?? 50,
    size: 25,
    description: "",
    hint: "",
  });
}

function resetGame() {
  gameData.name = "Spiel Name";
  gameData.authorId = 1;
  gameData.passphrase = "Passwort";
  gameData.description = "Eine Beschreibung des Spiels";
  gameData.image = "";
  gameData.eggs = [];
}

const focusOnEgg_pos_x = ref(0);
const focusOnEgg_pos_y = ref(0);
const useGameEditor = () => {
  return {
    gameData,
    imageDimensions,
    removeEgg,
    addEgg,
    resetGame,
    focusOnEgg_pos_x,
    focusOnEgg_pos_y,
  };
};

export default useGameEditor;

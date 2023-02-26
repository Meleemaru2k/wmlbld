const backgroundImageIndex = ref(Math.floor(Math.random() * 6));

export const useBackgroundImage = () => {
  return `background:url(/images/game_bg_${backgroundImageIndex.value}.jpg`;
};

export const useDoubleClick = () => {
  const isDoubleClick = ref<boolean | null>(null);

  const clickHandler = () => {
    if (isDoubleClick.value === null) {
      isDoubleClick.value = false;
      setTimeout(() => {
        isDoubleClick.value = null;
      }, 300);
    } else {
      isDoubleClick.value = true;
      setTimeout(() => {
        isDoubleClick.value = null;
      }, 300);
    }
  };

  return { clickHandler, isDoubleClick };
};

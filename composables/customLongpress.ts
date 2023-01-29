export const useCustomLongPress = (callback: (e: Event) => void) => {
  let timerId: number;
  const clear = () => {
    clearTimeout(timerId);
  };
  return {
    onMouseDown: (e: Event) => {
      timerId = window.setTimeout(() => callback(e), 1000);
    },
    onMouseUp: clear,
    onMouseLeave: clear,
    onMouseMove: clear,
    onTouchStart: (e: Event) => {
      timerId = window.setTimeout(() => callback(e), 1000);
    },
    onTouchEnd: clear,
    onTouchMove: clear,
  };
};

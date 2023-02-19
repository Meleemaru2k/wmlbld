export const useCustomLongPress = (
  callback: (e: Event) => void,
  timeout = 500
) => {
  let timerId: number;
  const clear = () => {
    clearTimeout(timerId);
  };
  return {
    onMouseDown: (e: Event) => {
      timerId = window.setTimeout(() => callback(e), timeout);
    },
    onMouseUp: clear,
    onMouseLeave: clear,
    onMouseMove: clear,
    onTouchStart: (e: Event) => {
      timerId = window.setTimeout(() => callback(e), timeout);
    },
    onTouchEnd: clear,
    onTouchMove: clear,
  };
};

function throttle(func, delay) {
  let isThrottled = false;
  let lastArgs;
  let savedThis;

  return function throttled(...args) {
    if (isThrottled) {
      lastArgs = args;
      savedThis = this;
      return;
    }

    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
      if (lastArgs) {
        throttled.apply(savedThis, lastArgs);
        lastArgs = null;
      }
    }, delay);

    func.apply(this, args);
  };
}

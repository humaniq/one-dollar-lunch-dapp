export const memoize = (func: any) => {
  // a cache of results
  const results = {};
  // return a function for the cache of results
  return (...args: any) => {
    // a JSON key to save the results cache
    const argsKey = JSON.stringify(args);
    // execute `func` only if there is no cached value of clumsysquare()
    // @ts-ignore
    if (!results[argsKey]) {
      // store the return value of clumsysquare()
      // @ts-ignore
      results[argsKey] = func(...args);
    }
    // return the cached results
    // @ts-ignore
    return results[argsKey];
  };
};

export function throttle(callback: any, limit: number) {
  let waiting = false; // Initially, we're not waiting
  return () => {
    // We return a throttled function
    if (!waiting) {
      // If we're not waiting
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      callback.apply(this, arguments); // Execute users function
      waiting = true; // Prevent future invocations
      setTimeout(function () {
        // After a period of time
        waiting = false; // And allow future invocations
      }, limit);
    }
  };
}

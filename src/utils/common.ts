export const noop = () => {};

export const wait = (ms: number) =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });

export const cutString = (str?: string | null, end: number = 16) => {
  if (typeof str !== "string") {
    return "";
  }

  return str.substring(0, end);
};

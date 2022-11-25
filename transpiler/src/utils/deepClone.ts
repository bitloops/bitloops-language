export const deepClone = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};

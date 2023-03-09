export const isUndefined = <T>(value?: T): value is undefined => {
  if (value === undefined) return true;
  else return false;
};

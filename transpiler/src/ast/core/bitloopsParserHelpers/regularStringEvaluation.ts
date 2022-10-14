export const regularStringEvaluation = (value: any): any => {
  return { type: 'string', value: value.substring(1, value.length - 1) };
};

export const regularDecimalEvaluation = (value: any): any => {
  const decimalPart = value.split('.')[1].length;
  // const decimalValue = Number(value);
  if (decimalPart <= 7) {
    return {
      type: 'float',
      value: value,
    };
  } else {
    return {
      type: 'double',
      value: value,
    };
  }
};

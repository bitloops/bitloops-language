export const regularIntegerEvaluation = (value: any): any => {
  const numericValue = Number(value);
  if (numericValue >= -2147483648 && numericValue <= 2147483647) {
    return { type: 'int32', value: value };
  } else if (numericValue >= -9223372036854775808 && numericValue <= 9223372036854775807n) {
    return { type: 'int64', value: value };
  } else {
    throw new Error(`Integer out of range: ${value}`);
  }
};

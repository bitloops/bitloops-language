const BOOL_STRING = 'bool';

export const booleanEvaluation = (value: any): any => {
  const booleanValue = value;
  if (booleanValue === 'true') {
    return {
      type: BOOL_STRING,
      value: value,
    };
  } else if (booleanValue === 'false') {
    return {
      type: BOOL_STRING,
      value: value,
    };
  }
  throw new Error(`Boolean value not recognized: ${value}`);
};

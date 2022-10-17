import prettier from 'prettier';

export const formatString = (code: string, config?: any): string => {
  const defaultFormatterConfig = { semi: true, parser: 'typescript', singleQuote: true };
  const formatterConfig = config ?? defaultFormatterConfig;
  return prettier.format(code, formatterConfig);
};

import { BitloopsLanguageAST, BitloopsParserError } from '../index.js';

const isBitloopsParserError = (
  value: BitloopsLanguageAST | BitloopsParserError,
): value is BitloopsParserError => {
  if (value instanceof BitloopsParserError) {
    return true;
  }
  return false;
};

export { isBitloopsParserError };

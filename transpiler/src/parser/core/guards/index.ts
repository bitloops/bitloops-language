import { BitloopsLanguageAST, BitloopsLanguageASTContext, BitloopsParserError } from '../types.js';

const isBitloopsParserError = (
  value: BitloopsLanguageAST | BitloopsLanguageASTContext | BitloopsParserError,
): value is BitloopsParserError => {
  if (value instanceof BitloopsParserError) {
    return true;
  }
  return false;
};
export { isBitloopsParserError };

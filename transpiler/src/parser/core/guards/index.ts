import {
  BitloopsLanguageAST,
  BitloopsLanguageASTContext,
  BitloopsParserError,
  BitloopsLanguageASTCoreContext,
} from '../types.js';

const isBitloopsParserError = (
  value:
    | BitloopsLanguageAST
    | BitloopsLanguageASTContext
    | BitloopsParserError
    | BitloopsLanguageASTCoreContext,
): value is BitloopsParserError => {
  if (value instanceof BitloopsParserError) {
    return true;
  }
  return false;
};
export { isBitloopsParserError };

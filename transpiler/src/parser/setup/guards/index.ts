import { BitloopsSetupParserError, BitloopsLanguageSetupAST } from '../types.js';

const isBitloopsSetupParserError = (
  value: BitloopsLanguageSetupAST | BitloopsSetupParserError,
): value is BitloopsSetupParserError => {
  if (value instanceof BitloopsSetupParserError) {
    return true;
  }
  return false;
};
export { isBitloopsSetupParserError };
